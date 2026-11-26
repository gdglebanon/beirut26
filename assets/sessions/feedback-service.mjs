import {findVote, voteDocument, votingWindow, showResults} from './feedback-model.mjs';

// Use the same public collection, status transitions and anonymous voter flow as
// Open Feedback's frontend. No admin SDK, proxy credentials or duplicate database.
export async function createFeedbackService(sdk, config) {
  const app = sdk.initializeApp(config.firebase, 'devfest-openfeedback');
  const db = sdk.getFirestore(app);
  const auth = sdk.getAuth(app);
  try {
    await sdk.setPersistence(auth, sdk.browserLocalPersistence);
  } catch {
    // A visitor who blocks durable storage can still vote during this visit.
    await sdk.setPersistence(auth, sdk.inMemoryPersistence);
  }
  await auth.authStateReady();
  const user = auth.currentUser || (await sdk.signInAnonymously(auth)).user;
  const eventId = config.eventId;
  const event = await sdk.getDoc(sdk.doc(db, 'projects', eventId));
  if (!event.exists()) throw new Error('This feedback event could not be found.');
  const project = event.data();
  const collection = sdk.collection(db, 'projects', eventId, 'userVotes');
  const own = await sdk.getDocs(sdk.query(collection, sdk.where('userId', '==', user.uid)));
  const votes = new Map();
  own.forEach(snapshot => votes.set(snapshot.id, {...snapshot.data(), id: snapshot.id}));
  const listeners = new Set();
  const pending = new Set();
  const emit = () => listeners.forEach(listener => listener());
  const allowedSessions = new Set(config.sessionIds || []);

  const check = (sessionId, item) => {
    if (!allowedSessions.has(sessionId)) throw new Error('Unknown session.');
    if (!project.voteItems?.some(value => value.id === item.id && value.type === item.type)) {
      throw new Error('This feedback option is no longer available.');
    }
    const window = votingWindow(project);
    if (!window.open) throw new Error(window.message);
  };

  const save = async (sessionId, item, text) => {
    check(sessionId, item);
    const key = `${sessionId}:${item.id}`;
    if (pending.has(key)) throw new Error('Feedback is already being saved.');
    pending.add(key);
    emit();
    try {
      const existing = findVote(votes, sessionId, item, item.type === 'boolean');
      const ref = existing ? sdk.doc(collection, existing.id)
        : item.type === 'boolean' ? sdk.doc(collection, `${user.uid}_${sessionId}_${item.id}`)
          : sdk.doc(collection);
      const document = item.type === 'boolean' && existing && existing.status !== 'deleted'
        ? {status: 'deleted', updatedAt: sdk.serverTimestamp()}
        : voteDocument({eventId, sessionId, item, userId: user.uid, id: ref.id,
          existing, text, timestamp: sdk.serverTimestamp()});
      await sdk.setDoc(ref, document, {merge: true});
      // Only acknowledge success once the write has actually been accepted.
      votes.set(ref.id, {...existing, ...document, id: ref.id});
    } finally {
      pending.delete(key);
      emit();
    }
  };

  const removeComment = async (sessionId, item) => {
    check(sessionId, item);
    const key = `${sessionId}:${item.id}`;
    if (pending.has(key)) throw new Error('Feedback is already being saved.');
    const existing = findVote(votes, sessionId, item);
    if (!existing) return;
    pending.add(key);
    emit();
    try {
      const update = {status: 'deleted', updatedAt: sdk.serverTimestamp()};
      await sdk.setDoc(sdk.doc(collection, existing.id), update, {merge: true});
      votes.set(existing.id, {...existing, ...update});
    } finally {
      pending.delete(key);
      emit();
    }
  };

  return {
    project, user, votes, pending, save, removeComment,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    results(sessionId, next, error) {
      // Snapshot the visibility decision at load, matching Open Feedback's
      // hide-until-voted behavior rather than exposing results mid-vote.
      if (!showResults(project, votes, sessionId)) { next(null); return () => {}; }
      return sdk.onSnapshot(sdk.doc(db, 'projects', eventId, 'sessionVotes', sessionId),
        snapshot => next(snapshot.exists() ? snapshot.data() : {}), error);
    },
  };
}
