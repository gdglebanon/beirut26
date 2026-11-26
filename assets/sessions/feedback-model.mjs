// Open Feedback vote document semantics, shared by the UI, service and tests.
export function votingWindow(project, now = Date.now()) {
  if (project.voteEndTime && Date.parse(project.voteEndTime) < now) {
    return {open: false, message: 'Feedback for this event has closed.'};
  }
  if (project.voteStartTime && now < Date.parse(project.voteStartTime)) {
    const date = new Date(project.voteStartTime).toLocaleString(undefined, {timeZone: 'Asia/Beirut'});
    return {open: false, message: `Feedback opens ${date} (Beirut time).`};
  }
  return {open: true, message: ''};
}

export function voteItems(project) {
  return [...(project.voteItems || [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export function findVote(votes, sessionId, item, includeDeleted = false) {
  return [...votes.values()].find(vote => vote.talkId === sessionId
    && vote.voteItemId === item.id && vote.voteType !== 'textPlus'
    && (item.type !== 'text' || vote.text)
    && (includeDeleted || vote.status !== 'deleted'));
}

export function showResults(project, votes, sessionId, now = Date.now()) {
  return !project.hideVotesUntilUserVote || !votingWindow(project, now).open
    || [...votes.values()].some(vote => vote.talkId === sessionId && vote.status === 'active');
}

export function voteDocument({eventId, sessionId, item, userId, id, existing, text, timestamp}) {
  const vote = {
    id, projectId: eventId, talkId: sessionId, voteItemId: item.id, userId,
    status: existing?.status === 'hidden' ? 'hidden' : 'active',
    updatedAt: timestamp,
  };
  // Merge updates leave the original server timestamp intact, including when
  // a freshly saved local vote still holds a serverTimestamp sentinel.
  if (!existing) vote.createdAt = timestamp;
  if (item.type === 'text') {
    vote.text = String(text ?? '').trim();
    if (!vote.text) throw new Error('Write a comment before saving.');
    if (vote.text.length > 3000) throw new Error('Please keep comments to 3,000 characters.');
  }
  return vote;
}

export function visibleComments(results, itemId) {
  const entries = results?.[itemId];
  if (!entries || typeof entries !== 'object') return [];
  return Object.entries(entries).filter(([, comment]) => comment && typeof comment.text === 'string' && comment.text.trim())
    .map(([id, comment]) => ({...comment, id}))
    .sort((a, b) => (b.updatedAt?.toMillis?.() ?? 0) - (a.updatedAt?.toMillis?.() ?? 0));
}
