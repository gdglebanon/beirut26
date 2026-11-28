(() => {
  'use strict';

  const switcher = document.getElementById('badge-mode-switch');
  if (!switcher) return;
  const panels = document.querySelectorAll('[data-badge-mode-panel]');
  const updateMode = () => {
    const selected = switcher.querySelector('input[name="badge-mode"]:checked');
    if (!selected) return;
    panels.forEach(panel => {
      panel.hidden = panel.dataset.badgeModePanel !== selected.value;
    });
  };
  switcher.addEventListener('change', updateMode);
  window.addEventListener('pageshow', updateMode);
  updateMode();
})();
