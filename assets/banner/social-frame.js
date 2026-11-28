(() => {
  'use strict';

  const field = name => document.getElementById(`social-frame-${name}`);
  const form = field('form');
  const canvas = field('canvas');
  if (!form || !canvas) return;
  const ctx = canvas.getContext('2d');
  const download = field('download');
  const dragZone = field('drag-zone');
  const viewport = { x: 128, y: 88, width: 1688, height: 870 };
  // A rectangle fully inside the irregular opening keeps contain mode uncropped.
  const safeArea = { x: 130, y: 258, width: 1684, height: 638 };
  let artwork;
  let photo;
  let loading = false;
  let exporting = false;
  let request = 0;
  let animation = 0;
  let drag;

  const message = (name, text, error = false) => {
    field(name).textContent = text;
    field(name).classList.toggle('is-error', error);
  };
  const loadImage = src => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image could not be loaded.'));
    image.src = src;
  });
  const syncDownload = () => {
    download.disabled = !artwork || !photo || loading || exporting;
    download.textContent = exporting ? 'Creating your PNG…' : loading ? 'Loading your photo…' : photo ? 'Download social post' : 'Add a photo to download';
  };
  const photoSize = () => {
    const contain = field('fit').value === 'contain';
    const area = contain ? safeArea : viewport;
    const fit = contain ? Math.min : Math.max;
    const scale = fit(area.width / photo.naturalWidth, area.height / photo.naturalHeight) * Number(field('zoom').value);
    return { area, width: photo.naturalWidth * scale, height: photo.naturalHeight * scale };
  };
  // Trace the supplied artwork's inner opening, preserving its border and lower wave.
  const opening = new Path2D('M128 223 L206 146 H1267 L1327 88 H1541 L1691 242 H1800 Q1816 242 1816 257 V798 L1721 898 H1213 L1153 958 H447 C391 936 346 919 300 919 C240 919 184 939 128 958 Z');
  // Keep the three blue slashes in the upper tab visible over the uploaded photo.
  opening.moveTo(1342, 127); opening.lineTo(1364, 94); opening.lineTo(1373, 100); opening.lineTo(1351, 133); opening.closePath();
  opening.moveTo(1372, 127); opening.lineTo(1394, 94); opening.lineTo(1403, 100); opening.lineTo(1381, 133); opening.closePath();
  opening.moveTo(1402, 127); opening.lineTo(1424, 94); opening.lineTo(1433, 100); opening.lineTo(1411, 133); opening.closePath();

  const draw = () => {
    if (!artwork || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(artwork, 0, 0, canvas.width, canvas.height);
    if (photo) {
      const size = photoSize();
      ctx.save();
      ctx.clip(opening, 'evenodd');
      ctx.drawImage(photo,
        size.area.x + (size.area.width - size.width) * Number(field('x').value) / 100,
        size.area.y + (size.area.height - size.height) * Number(field('y').value) / 100,
        size.width, size.height);
      ctx.restore();
    }
    canvas.setAttribute('aria-label', photo ? 'Your photo inside the DevFest Beirut 2026 social frame. November 28, 2026.' : 'Preview of the DevFest Beirut 2026 social frame. Add your photo to personalize it.');
  };
  const scheduleDraw = () => {
    cancelAnimationFrame(animation);
    animation = requestAnimationFrame(draw);
  };
  const reset = () => {
    field('zoom').value = '1';
    field('x').value = '50';
    field('y').value = '50';
    if (photo) message('status', 'Your preview updates as you edit.');
    scheduleDraw();
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!artwork || !photo || loading || exporting) return;
    exporting = true; syncDownload();
    try {
      draw();
      const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Export failed')), 'image/png'));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'devfest-beirut-2026-social-post.png';
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      message('status', 'Your 1920 × 1080 PNG is ready. Share your DevFest moment!');
    } catch {
      message('status', 'The PNG could not be created. Please try again.', true);
    } finally { exporting = false; syncDownload(); }
  });
  form.addEventListener('input', event => {
    if (event.target !== field('photo')) {
      message('status', 'Your preview updates as you edit.');
      scheduleDraw();
    }
  });
  field('fit').addEventListener('change', reset);
  field('reset').addEventListener('click', reset);
  field('photo').addEventListener('change', async () => {
    const file = field('photo').files[0];
    if (!file) return;
    const current = ++request;
    loading = false; syncDownload();
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 15 * 1024 * 1024) {
      field('photo').value = '';
      message('photo-status', 'Choose a JPG, PNG or WebP image smaller than 15 MB.', true);
      return;
    }
    loading = true; syncDownload();
    message('photo-status', 'Loading your photo…');
    const url = URL.createObjectURL(file);
    try {
      const loaded = await loadImage(url);
      if (current !== request) return;
      photo = loaded;
      reset();
      field('controls').hidden = false;
      dragZone.hidden = false;
      message('photo-status', 'Photo ready. Adjust the framing or download your social post.');
    } catch {
      if (current !== request) return;
      field('photo').value = '';
      message('photo-status', 'This photo could not be opened. Try another JPG, PNG or WebP.', true);
    } finally {
      URL.revokeObjectURL(url);
      if (current === request) { loading = false; syncDownload(); }
    }
  });
  field('remove').addEventListener('click', () => {
    request += 1; photo = null; loading = false;
    field('photo').value = '';
    field('controls').hidden = true;
    dragZone.hidden = true;
    message('photo-status', 'Photo removed. Choose another photo to start again.');
    message('status', 'Add a photo to create your social post.');
    syncDownload(); scheduleDraw(); field('photo').focus();
  });
  const clamp = value => Math.min(100, Math.max(0, value));
  dragZone.addEventListener('pointerdown', event => {
    if (!photo || event.button !== 0) return;
    const size = photoSize();
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY,
      x: Number(field('x').value), y: Number(field('y').value),
      scale: canvas.width / canvas.getBoundingClientRect().width,
      spanX: size.area.width - size.width, spanY: size.area.height - size.height };
    dragZone.setPointerCapture(event.pointerId);
    dragZone.classList.add('is-dragging');
    event.preventDefault();
  });
  dragZone.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    if (Math.abs(drag.spanX) > 1) field('x').value = String(clamp(drag.x + (event.clientX - drag.startX) * drag.scale / drag.spanX * 100));
    if (Math.abs(drag.spanY) > 1) field('y').value = String(clamp(drag.y + (event.clientY - drag.startY) * drag.scale / drag.spanY * 100));
    scheduleDraw();
  });
  const endDrag = () => { drag = null; dragZone.classList.remove('is-dragging'); };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(event => dragZone.addEventListener(event, endDrag));
  dragZone.addEventListener('wheel', event => {
    if (!photo || !event.deltaY) return;
    event.preventDefault();
    field('zoom').value = String(Math.min(3, Math.max(.5, Number(field('zoom').value) - Math.sign(event.deltaY) * .1)));
    scheduleDraw();
  }, { passive: false });

  loadImage('assets/banner/social-post-frame.png').then(image => {
    if (!ctx) throw new Error('Canvas is unavailable');
    artwork = image;
    draw(); syncDownload();
    message('status', 'Add a photo to create your social post.');
  }).catch(() => {
    download.disabled = true;
    message('status', 'The frame could not load. Refresh the page to try again.', true);
  });
})();
