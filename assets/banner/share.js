(() => {
  'use strict';

  const message = document.getElementById('badge-share-text');
  const role = document.getElementById('banner-role');
  if (!message || !role) return;
  const status = document.getElementById('badge-share-status');
  const nativeShare = document.getElementById('badge-share-native');
  const eventUrl = 'https://devfest26.gdglebanon.com/';
  let edited = false;

  const updateLinks = () => {
    const encoded = encodeURIComponent(message.value.trim());
    document.getElementById('badge-share-linkedin').href = `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`;
    document.getElementById('badge-share-whatsapp').href = `https://wa.me/?text=${encoded}`;
    document.getElementById('badge-share-email').href = `mailto:?subject=DevFest%20Beirut%202026&body=${encoded}`;
  };
  const resetMessage = () => {
    const introductions = {
      attendee: 'I’m attending',
      speaker: 'I’m speaking at',
      sponsor: 'We’re a proud sponsor of',
      partner: 'We’re a proud partner of',
      organizer: 'I’m helping organize',
      volunteer: 'I’m volunteering at',
    };
    message.value = `${introductions[role.value] || introductions.attendee} DevFest Beirut 2026 on Saturday, November 28 at MEA Conference Center, Beirut! Looking forward to talks, panels and connecting with Lebanon’s developer community.\n\nMore details: ${eventUrl}\n\n#DevFest #DevFestBeirut #GDGCoastLebanon`;
    edited = false;
    updateLinks();
  };
  const copyMessage = async () => {
    if (!message.value.trim()) {
      status.textContent = 'Write a message to copy first.';
      message.focus();
      return false;
    }
    try {
      await navigator.clipboard.writeText(message.value.trim());
      status.textContent = 'Message copied. Paste it into your post and attach your downloaded badge.';
      return true;
    } catch {
      message.focus();
      message.select();
      status.textContent = 'Select Copy from your device’s menu, or press Ctrl+C / ⌘C to copy the selected message.';
      return false;
    }
  };

  message.addEventListener('input', () => { edited = true; status.textContent = ''; updateLinks(); });
  role.addEventListener('change', () => {
    if (!edited) { resetMessage(); status.textContent = ''; }
    else status.textContent = 'Your custom message has been kept. Use Reset message to match your new role.';
  });
  document.getElementById('badge-share-reset').addEventListener('click', () => {
    resetMessage();
    status.textContent = 'Message reset to match your selected role.';
  });
  document.getElementById('badge-share-copy').addEventListener('click', copyMessage);
  // LinkedIn's undocumented composer URL carries the current message directly.
  // Keep Copy text available if a LinkedIn client ignores the text parameter.
  document.getElementById('badge-share-linkedin').addEventListener('click', (event) => {
    if (!message.value.trim()) {
      event.preventDefault();
      message.focus();
      status.textContent = 'Write a message to share first.';
      return;
    }
    updateLinks();
    status.textContent = 'Attach your downloaded badge in LinkedIn before posting. If your message is missing, use Copy text and paste it into your post.';
  });
  if (navigator.share) {
    nativeShare.hidden = false;
    nativeShare.addEventListener('click', async () => {
      if (!message.value.trim()) { message.focus(); status.textContent = 'Write a message to share first.'; return; }
      try {
        await navigator.share({ title: 'DevFest Beirut 2026', text: message.value.trim() });
        status.textContent = 'Sharing options opened.';
      } catch (error) {
        if (error.name !== 'AbortError') await copyMessage();
      }
    });
  }
  resetMessage();

  const badgeDisclosure = document.getElementById('badge-disclosure');
  const revealBadge = () => {
    if (window.location.hash !== '#my-banner') return;
    badgeDisclosure.open = true;
  };
  document.querySelectorAll('a[href="#my-banner"]').forEach(link => link.addEventListener('click', () => {
    badgeDisclosure.open = true;
  }));
  window.addEventListener('hashchange', revealBadge);
  revealBadge();

  // Expand the package comparison entry point when arriving from a homepage shortcut.
  const revealSponsorship = () => {
    if (window.location.hash !== '#sponsorship') return;
    document.querySelector('#sponsorship .partnership-disclosure').open = true;
  };
  document.querySelectorAll('a[href="#sponsorship"]').forEach(link => link.addEventListener('click', () => {
    document.querySelector('#sponsorship .partnership-disclosure').open = true;
  }));
  window.addEventListener('hashchange', revealSponsorship);
  revealSponsorship();
})();
