const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../assets/sessions/feedback.js'), 'utf8');

function load(eventId, sessionId = 'talk1') {
  const frames = [];
  const status = {textContent: 'Session feedback will open here soon.'};
  const link = {hidden: true};
  const panel = {
    dataset: {sessionId, sessionDate: '2026-11-28'},
    querySelector(selector) {
      return {
        '[role="status"]': status,
        '[data-feedback-link]': link,
        '[data-feedback-embed]': {append(frame) {frames.push(frame);}},
      }[selector];
    },
  };
  vm.runInNewContext(source, {
    URL,
    window: {DEVFEST_FEEDBACK: {eventId}},
    document: {querySelector() {return panel;}, createElement() {return {}; }},
  });
  return {frames, status, link};
}

test('an unconfigured event shows a pending message without loading third-party content', () => {
  const result = load('');
  assert.equal(result.frames.length, 0);
  assert.equal(result.link.hidden, true);
  assert.match(result.status.textContent, /soon/);
});

test('talk and panel feedback use the documented event/date/session route', () => {
  for (const id of ['talk1', 'panel1', 'talk5', 'panel4']) {
    const {frames, link} = load('exampleEventId', id);
    assert.equal(frames.length, 1);
    const url = new URL(frames[0].src);
    assert.equal(url.origin, 'https://openfeedback.io');
    assert.equal(url.pathname, `/exampleEventId/2026-11-28/${id}`);
    assert.equal(url.searchParams.get('forceColorScheme'), 'light');
    assert.equal(link.href, url.href);
    assert.equal(link.hidden, false);
    assert.equal(frames[0].loading, 'lazy');
    assert.ok(frames[0].title);
  }
});

test('invalid event IDs never produce a feedback URL', () => {
  for (const id of ['https://example.com/', '../other-event', 'event id']) {
    const {frames, link, status} = load(id);
    assert.equal(frames.length, 0);
    assert.equal(link.hidden, true);
    assert.match(status.textContent, /unavailable/);
  }
});
