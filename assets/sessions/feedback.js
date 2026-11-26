(() => {
  'use strict';

  const config = window.DEVFEST_FEEDBACK;
  if (!config?.eventId) return;
  const assetBase = new URL('.', document.currentScript.src);
  const cleanups = [];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const messageFor = error => {
    if (/^Feedback (opens|for this event has closed)/.test(error?.message || '')) return error.message;
    if (/Write a comment|3,000 characters/.test(error?.message || '')) return error.message;
    return 'Unable to save feedback. Please check your connection and try again.';
  };

  function render(panel, service, model) {
    const sessionId = panel.dataset.sessionId;
    const status = panel.querySelector('[role="status"]');
    const formRoot = panel.querySelector('[data-feedback-form]');
    const choices = [];
    const forms = [];
    let results;
    formRoot.replaceChildren();
    const grid = element('div', 'feedback-options');
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'Session feedback options');
    formRoot.append(grid);
    const announce = (text, error = false) => {
      status.textContent = text;
      status.classList.toggle('is-error', error);
    };

    for (const item of model.voteItems(service.project)) {
      if (item.type === 'boolean') {
        const button = element('button', 'feedback-choice');
        button.type = 'button';
        button.setAttribute('aria-pressed', 'false');
        button.append(element('span', 'feedback-choice-label', item.name));
        const count = element('span', 'feedback-count');
        count.hidden = true;
        button.append(count);
        button.addEventListener('click', async () => {
          announce('Saving feedback…');
          try {
            await service.save(sessionId, item);
            announce('Feedback saved. Click a selected option again to remove it.');
          } catch (error) { announce(messageFor(error), true); }
        });
        grid.append(button);
        choices.push({item, button, count});
      } else if (item.type === 'text') {
        const form = element('form', 'feedback-comment-form');
        const id = `feedback-comment-${sessionId}-${item.id}`;
        const label = element('label', '', item.name || 'Comment');
        label.htmlFor = id;
        const input = element('textarea', 'feedback-comment-input');
        input.id = id;
        input.rows = 4;
        input.maxLength = 3000;
        input.placeholder = 'What worked well? What could be improved?';
        const actions = element('div', 'feedback-comment-actions');
        const save = element('button', 'button button-blue', 'Save comment');
        save.type = 'submit';
        const remove = element('button', 'feedback-remove', 'Remove my comment');
        remove.type = 'button';
        const moderation = element('p', 'feedback-moderation', 'Your comment is hidden by moderation. Editing it will keep it hidden.');
        moderation.hidden = true;
        const list = element('ul', 'feedback-comments');
        list.setAttribute('aria-label', 'Attendee comments');
        const field = {item, form, input, save, remove, moderation, list, dirty: false};
        input.addEventListener('input', () => { field.dirty = true; update(); });
        form.addEventListener('submit', async event => {
          event.preventDefault();
          const draft = input.value;
          announce('Saving comment…');
          try {
            await service.save(sessionId, item, draft);
            // Do not overwrite changes the visitor typed while saving.
            field.dirty = input.value !== draft;
            update();
            announce('Comment saved. Thank you for your feedback.');
          } catch (error) { announce(messageFor(error), true); }
        });
        remove.addEventListener('click', async () => {
          announce('Removing comment…');
          try {
            await service.removeComment(sessionId, item);
            field.dirty = false;
            input.value = '';
            update();
            announce('Your comment has been removed.');
          } catch (error) { announce(messageFor(error), true); }
        });
        actions.append(save, remove);
        form.append(label, input, moderation, actions);
        formRoot.append(form, list);
        forms.push(field);
      } else if (item.type === 'title') {
        formRoot.append(element('h4', 'feedback-form-heading', item.name));
      } else if (item.type === 'separator') {
        formRoot.append(element('hr', 'feedback-separator'));
      }
    }

    function update() {
      const window = model.votingWindow(service.project);
      for (const {item, button, count} of choices) {
        const vote = model.findVote(service.votes, sessionId, item);
        const saving = service.pending.has(`${sessionId}:${item.id}`);
        button.setAttribute('aria-pressed', String(Boolean(vote)));
        button.disabled = !window.open || saving;
        button.classList.toggle('is-saving', saving);
        count.hidden = results == null;
        if (results != null) {
          const total = typeof results[item.id] === 'number' ? results[item.id] : 0;
          count.textContent = `${total} ${total === 1 ? 'vote' : 'votes'}`;
        }
      }
      for (const field of forms) {
        const vote = model.findVote(service.votes, sessionId, field.item);
        const saving = service.pending.has(`${sessionId}:${field.item.id}`);
        if (!field.dirty) field.input.value = vote?.text || '';
        field.input.disabled = !window.open;
        field.save.disabled = !window.open || saving || !field.input.value.trim();
        field.save.textContent = saving ? 'Saving…' : vote ? 'Update comment' : 'Save comment';
        field.remove.hidden = !vote;
        field.remove.disabled = !window.open || saving;
        field.moderation.hidden = vote?.status !== 'hidden';
        field.list.replaceChildren();
        for (const comment of model.visibleComments(results, field.item.id)) {
          const entry = element('li', 'feedback-comment');
          entry.append(element('strong', '', comment.userId === service.user.uid ? 'Your comment' : 'Attendee'));
          entry.append(element('p', '', comment.text));
          field.list.append(entry);
        }
      }
      if (!window.open) announce(window.message);
    }
    cleanups.push(service.subscribe(update));
    cleanups.push(service.results(sessionId, value => {
      results = value;
      update();
    }, () => announce('Community results could not refresh. You can still submit feedback.')));
    update();
    const window = model.votingWindow(service.project);
    announce(window.open ? 'Anonymous feedback · choose any options that apply.' : window.message);
  }

  const panels = [...document.querySelectorAll('[data-session-feedback]')];
  for (const panel of panels) {
    let loading = false;
    let mounted = false;
    const status = panel.querySelector('[role="status"]');
    const retry = element('button', 'feedback-retry', 'Try loading feedback again');
    retry.type = 'button';
    retry.hidden = true;
    panel.append(retry);
    const mount = async () => {
      if (loading || mounted) return;
      loading = true;
      retry.hidden = true;
      status.textContent = 'Loading session feedback…';
      try {
        if (!/^[A-Za-z0-9_-]+$/.test(config.eventId)) throw new Error('Invalid event ID.');
        const [client, model] = await Promise.all([
          import(new URL('feedback-client.mjs', assetBase).href),
          import(new URL('feedback-model.mjs', assetBase).href),
        ]);
        const service = await client.connectFeedback(config);
        render(panel, service, model);
        mounted = true;
      } catch (error) {
        status.textContent = 'Feedback could not load. Check your connection and try again.';
        retry.hidden = false;
        console.warn('Feedback connection failed:', error.code || error.message);
      } finally { loading = false; }
    };
    retry.addEventListener('click', mount);
    // Agenda feedback stays closed and unloaded until the visitor opens it.
    const disclosure = panel.closest('.session-inline-feedback');
    if (disclosure) {
      disclosure.addEventListener('toggle', () => { if (disclosure.open) mount(); });
      if (disclosure.open) mount();
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          mount();
        }
      }, {rootMargin: '300px'});
      observer.observe(panel);
      cleanups.push(() => observer.disconnect());
    } else {
      const agenda = panel.closest('.agenda-disclosure');
      if (agenda && !agenda.open) agenda.addEventListener('toggle', () => { if (agenda.open) mount(); });
      else mount();
    }
  }
  window.addEventListener('pagehide', event => {
    if (!event.persisted) cleanups.forEach(cleanup => cleanup());
  });
})();
