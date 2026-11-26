const assert = require('node:assert/strict');
const {test, before} = require('node:test');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
let model, createFeedbackService;
before(async () => {
  model = await import(pathToFileURL(path.join(__dirname, '../assets/sessions/feedback-model.mjs')));
  ({createFeedbackService} = await import(pathToFileURL(path.join(__dirname, '../assets/sessions/feedback-service.mjs'))));
});

const reaction = {id: 'zl9HWOiVqgqUDVi3Rvvs', type: 'boolean', name: 'Fun 😃', position: 0};
const comment = {id: 'GXpiqVbJ1mCytDOk9V1o', type: 'text', name: 'Comment', position: 8};
const config = {eventId: 'gEQjsPtq6m2n4iTrwxe6', firebase: {}, sessionIds: ['talk1', 'talk2', 'panel1']};

async function fixture(options = {}) {
  const writes = [], queries = [], stored = new Map();
  let nextId = 0, watched = 0;
  const project = {voteItems: [reaction, comment], ...options.project};
  const user = {uid: 'anonymous-voter', isAnonymous: true};
  const sdk = {
    initializeApp() { return {}; }, getFirestore() { return {}; },
    getAuth() { return {currentUser: user, async authStateReady() {}}; },
    async setPersistence() {}, browserLocalPersistence: 'local', inMemoryPersistence: 'memory',
    async signInAnonymously() { throw new Error('Existing identity should be reused.'); },
    collection(db, ...parts) { return {path: parts.join('/')}; },
    doc(base, ...parts) {
      const route = base.path ? `${base.path}/${parts[0] || `auto-${++nextId}`}` : parts.join('/');
      return {path: route, id: route.split('/').at(-1)};
    },
    async getDoc() { return {exists: () => true, data: () => project}; },
    where(...args) { return args; },
    query(...args) { queries.push(args); return args; },
    async getDocs() { return {forEach(callback) {
      for (const vote of options.votes || []) callback({id: vote.id, data: () => vote});
    }}; },
    serverTimestamp() { return {serverTimestamp: true}; },
    async setDoc(ref, data, flags) {
      writes.push({ref, data, flags});
      if (options.gate) await options.gate;
      if (options.reject) throw new Error('permission-denied');
      stored.set(ref.id, {...stored.get(ref.id), ...data});
    },
    onSnapshot(ref, callback) { watched++; callback({exists: () => true, data: () => ({[reaction.id]: 2})}); return () => {}; },
  };
  const service = await createFeedbackService(sdk, config);
  return {service, writes, queries, stored, watched: () => watched};
}

test('reads only the current anonymous voter documents', async () => {
  const {queries} = await fixture();
  assert.equal(queries[0][0].path, `projects/${config.eventId}/userVotes`);
  assert.deepEqual(queries[0][1], ['userId', '==', 'anonymous-voter']);
});

test('repeated boolean toggles reuse one vote record and remove via deleted status', async () => {
  const {service, writes, stored} = await fixture();
  await service.save('talk1', reaction);
  await service.save('talk1', reaction);
  await service.save('talk1', reaction);
  assert.equal(stored.size, 1);
  assert.deepEqual(writes.map(w => w.data.status), ['active', 'deleted', 'active']);
  assert.equal(writes[0].data.userId, 'anonymous-voter');
  assert.equal(writes[0].data.projectId, config.eventId);
  assert.equal(writes[0].data.talkId, 'talk1');
  assert.ok(writes[0].data.createdAt);
  assert.equal('createdAt' in writes[2].data, false, 'updates preserve the original server timestamp');
  assert.ok(writes.every(w => w.flags.merge));
});

test('edits a legacy random-ID comment in place and preserves moderation', async () => {
  const old = {id: 'legacy-id', talkId: 'panel1', voteItemId: comment.id, userId: 'anonymous-voter', status: 'hidden', text: 'Original', createdAt: 'original-time'};
  const {service, writes} = await fixture({votes: [old]});
  await service.save('panel1', comment, '  Revised comment  ');
  assert.equal(writes[0].ref.id, 'legacy-id');
  assert.equal(writes[0].data.status, 'hidden');
  assert.equal(writes[0].data.text, 'Revised comment');
  assert.equal('createdAt' in writes[0].data, false);
  assert.equal(service.votes.get('legacy-id').createdAt, 'original-time');
});

test('removing and reposting a comment creates a new ID so old upvotes do not transfer', async () => {
  const {service, writes} = await fixture();
  await service.save('talk1', comment, 'First');
  await service.removeComment('talk1', comment);
  await service.save('talk1', comment, 'Second');
  assert.equal(writes[1].data.status, 'deleted');
  assert.notEqual(writes[0].ref.id, writes[2].ref.id);
});

test('a rejected write never marks feedback as saved or selected', async () => {
  const {service} = await fixture({reject: true});
  await assert.rejects(service.save('talk1', reaction), /permission-denied/);
  assert.equal(service.votes.size, 0);
  assert.equal(service.pending.size, 0);
});

test('concurrent clicks cannot create duplicate votes', async () => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const {service, writes} = await fixture({gate});
  const first = service.save('talk1', reaction);
  await assert.rejects(service.save('talk1', reaction), /already being saved/);
  assert.equal(writes.length, 1);
  release();
  await first;
  assert.equal(service.votes.size, 1);
});

test('rejects unknown sessions, vote items, blank comments and oversized comments', async () => {
  const {service, writes} = await fixture();
  await assert.rejects(service.save('other-event', reaction), /Unknown session/);
  await assert.rejects(service.save('talk1', {...reaction, id: 'invented'}), /no longer available/);
  await assert.rejects(service.save('talk1', comment, '   '), /Write a comment/);
  await assert.rejects(service.save('talk1', comment, 'a'.repeat(3001)), /3,000/);
  assert.equal(writes.length, 0);
});

test('respects opening and closing times on every write', async () => {
  for (const project of [{voteStartTime: '2999-01-01T00:00:00Z'}, {voteEndTime: '2000-01-01T00:00:00Z'}]) {
    const {service, writes} = await fixture({project});
    await assert.rejects(service.save('talk1', reaction), /Feedback (opens|for this event has closed)/);
    assert.equal(writes.length, 0);
  }
});

test('hidden results are not even subscribed to until the visibility conditions permit it', async () => {
  const hidden = await fixture({project: {hideVotesUntilUserVote: true}});
  let value;
  hidden.service.results('talk1', result => { value = result; });
  assert.equal(value, null);
  assert.equal(hidden.watched(), 0);
  const open = await fixture();
  open.service.results('talk1', () => {});
  assert.equal(open.watched(), 1);
});

test('comment aggregation ignores removed empty entries and keeps user text as data', () => {
  const results = {[comment.id]: {deleted: {}, active: {text: '<img src=x onerror=alert(1)>', userId: 'other'}}};
  const comments = model.visibleComments(results, comment.id);
  assert.equal(comments.length, 1);
  assert.equal(comments[0].text, '<img src=x onerror=alert(1)>');
});
