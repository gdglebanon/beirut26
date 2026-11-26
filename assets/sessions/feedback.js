(() => {
  'use strict';

  const panel = document.querySelector('[data-session-feedback]');
  if (!panel) return;
  const eventId = window.DEVFEST_FEEDBACK?.eventId;
  if (!eventId) return;
  const status = panel.querySelector('[role="status"]');
  if (!/^[A-Za-z0-9_-]+$/.test(eventId)) {
    status.textContent = 'Feedback is temporarily unavailable. Please check back shortly.';
    return;
  }

  const url = new URL(`/${eventId}/${panel.dataset.sessionDate}/${panel.dataset.sessionId}`, 'https://openfeedback.io');
  url.searchParams.set('forceColorScheme', 'light');
  const link = panel.querySelector('[data-feedback-link]');
  link.href = url.href;
  link.hidden = false;
  const frame = document.createElement('iframe');
  frame.className = 'feedback-frame';
  frame.title = 'Session feedback and comments on Open Feedback';
  frame.src = url.href;
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  panel.querySelector('[data-feedback-embed]').append(frame);
  status.textContent = 'Give feedback below. If the form does not load, open it directly in Open Feedback.';
})();
