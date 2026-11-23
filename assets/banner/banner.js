(() => {
  'use strict';

  const form = document.getElementById('banner-form');
  const canvas = document.getElementById('banner-canvas');
  if (!form || !canvas) return;
  const ctx = canvas.getContext('2d');
  const field = name => document.getElementById(`banner-${name}`);
  const status = field('status');
  const download = field('download');
  const ink = '#1e1e1e';
  const palette = {
    blue: '#306ea6', green: '#54a863', yellow: '#edbe4b', red: '#ca4b3e', rose: '#db9ab6',
  };
  const googleColors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];
  const googleGradientColors = [googleColors[0], googleColors[3], googleColors[2], googleColors[1]];
  const roles = {
    attendee: { label: 'Attendee', prefix: 'I’m ', headline: 'Attending!', color: 'blue' },
    speaker: { label: 'Speaker', prefix: 'I’m ', headline: 'Speaking!', color: 'yellow' },
    sponsor: { label: 'Sponsor', prefix: 'Proud ', headline: 'Sponsor', color: 'green', organization: true },
    partner: { label: 'Partner', prefix: 'Proud ', headline: 'Partner', color: 'green', organization: true },
    organizer: { label: 'Organizer', prefix: 'I’m ', headline: 'Organizing!', color: 'red' },
    volunteer: { label: 'Volunteer', prefix: 'I’m ', headline: 'Volunteering!', color: 'rose' },
  };
  const assets = {};
  let ready = false;
  let photo = null;
  let photoRequest = 0;
  let photoLoading = false;
  let exporting = false;
  let frame = 0;
  let previousOrganization;
  let drag = null;
  const dragZone = field('drag-zone');

  const message = (element, text, error = false) => {
    element.textContent = text;
    element.classList.toggle('is-error', error);
  };
  const loadImage = src => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image could not be loaded.'));
    image.src = src;
  });
  const font = (size, weight = 400) => { ctx.font = `${weight} ${size}px "DevFest Banner", sans-serif`; };
  const rounded = (x, y, width, height, radius, fill, stroke = null, lineWidth = 3) => {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  };
  const text = (value, x, y, size, weight = 400, color = ink) => {
    font(size, weight);
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  };
  const clean = input => input.value.trim().replace(/\s+/g, ' ');

  // Wrap at words, splitting unusually long words without clipping them.
  const linesFor = (value, width) => {
    const lines = [];
    let line = '';
    for (const word of value.split(/\s+/)) {
      if (ctx.measureText(line ? `${line} ${word}` : word).width <= width) {
        line = line ? `${line} ${word}` : word;
        continue;
      }
      if (line) lines.push(line);
      line = '';
      for (const character of word) {
        if (line && ctx.measureText(line + character).width > width) {
          lines.push(line);
          line = '';
        }
        line += character;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  const textBlock = (value, x, y, width, size, weight, maxLines, minimum) => {
    if (!value) return y;
    let lines;
    do {
      font(size, weight);
      lines = linesFor(value, width);
      if (lines.length <= maxLines || size <= minimum) break;
      size -= 1;
    } while (size >= minimum);
    // The form limits keep ordinary names intact; ellipsis protects unusual glyph widths.
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      let last = lines[maxLines - 1];
      while (last && ctx.measureText(`${last}…`).width > width) last = last.slice(0, -1);
      lines[maxLines - 1] = `${last}…`;
    }
    ctx.fillStyle = ink;
    for (const line of lines) { ctx.fillText(line, x, y); y += size * 1.18; }
    return y;
  };
  const photoSize = () => {
    const baseScale = field('fit').value === 'contain'
      ? Math.min(326 / photo.naturalWidth, 456 / photo.naturalHeight)
      : Math.max(390 / photo.naturalWidth, 520 / photo.naturalHeight);
    const scale = baseScale * Number(field('zoom').value);
    return { width: photo.naturalWidth * scale, height: photo.naturalHeight * scale };
  };
  // Match the Community Sponsor accent: blue → green → yellow → red avoids a purple transition.
  const multicolor = (x, y, width) => {
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    googleGradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (googleGradientColors.length - 1), color);
    });
    return gradient;
  };

  function draw() {
    if (!ready) return;
    const role = roles[field('role').value];
    const colorName = role.color;
    const accent = palette[colorName];
    const isMulti = field('multicolor').checked;
    const name = clean(field('name'));
    const job = clean(field('job'));
    const company = clean(field('company'));
    ctx.clearRect(0, 0, 1080, 1350);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 1080, 1350);

    // Give DevFest the full header width; the GDG wordmark appears once in the footer.
    const lockupX = 64, lockupY = 68, lockupWidth = 952;
    const lockupHeight = lockupWidth * 285 / 843;
    const flagWidth = lockupWidth * .184;
    const flagHeight = flagWidth * 269 / 480;
    ctx.drawImage(assets.lockup, lockupX, lockupY, lockupWidth, lockupHeight);
    ctx.drawImage(assets.flag, lockupX + lockupWidth * .791, lockupY + lockupHeight - flagHeight - 5, flagWidth, flagHeight);

    let headlineSize = 94;
    const heading = role.prefix + role.headline;
    font(headlineSize, 700);
    while (ctx.measureText(heading).width > 952) font(--headlineSize, 700);
    let headlineX = (1080 - ctx.measureText(heading).width) / 2;
    text(role.prefix, headlineX, 504, headlineSize, 700);
    headlineX += ctx.measureText(role.prefix).width;
    text(role.headline, headlineX, 504, headlineSize, 700, isMulti ? multicolor(headlineX, 504, ctx.measureText(role.headline).width) : accent);

    googleColors.forEach((color, index) => {
      ctx.beginPath(); ctx.arc(71 + index * 20, 565, 7, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
    });
    let nextY = textBlock(name || (role.organization ? 'Your organization' : 'Your name'), 64, 631, 490, 56, 700, 2, 28);
    if (job) nextY = textBlock(job, 64, nextY + 16, 490, 30, 400, 2, 20);
    if (company) textBlock(company, 64, nextY + 18, 490, 34, 700, 2, 22);
    const x = 604, y = 559, width = 390, height = 520;
    // Align the illustration's baseline with the photo card's offset backing.
    ctx.drawImage(assets.coast, 40, y + height + 22 - 270, 540, 270);

    rounded(x + 22, y + 22, width, height, 44, isMulti ? multicolor(x + 22, y + 22, width) : accent, ink, 4);
    rounded(x, y, width, height, 44, '#fff');
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x + 2, y + 2, width - 4, height - 4, 42); ctx.clip();
    if (photo) {
      const { width: imageWidth, height: imageHeight } = photoSize();
      const positionX = Number(field('x').value) / 100;
      const positionY = Number(field('y').value) / 100;
      ctx.drawImage(photo, x + (width - imageWidth) * positionX, y + (height - imageHeight) * positionY, imageWidth, imageHeight);
    } else {
      ctx.fillStyle = '#eaf0f5'; ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = '#d9e2e9'; ctx.lineWidth = 1;
      for (let gridX = x; gridX < x + width; gridX += 32) { ctx.beginPath(); ctx.moveTo(gridX, y); ctx.lineTo(gridX, y + height); ctx.stroke(); }
      for (let gridY = y; gridY < y + height; gridY += 32) { ctx.beginPath(); ctx.moveTo(x, gridY); ctx.lineTo(x + width, gridY); ctx.stroke(); }
      ctx.textAlign = 'center';
      if (name) {
        const initials = name.split(/\s+/).slice(0, 2).map(word => [...word][0]).join('').toLocaleUpperCase();
        text(initials, x + width / 2, y + 295, 120, 700, accent);
      } else {
        ctx.beginPath(); ctx.arc(x + width / 2, y + 205, 48, 0, Math.PI * 2); ctx.strokeStyle = '#9aa9b6'; ctx.lineWidth = 4; ctx.stroke();
        text(role.organization ? 'Your logo here' : 'Your photo here', x + width / 2, y + 300, 28, 500, '#647585');
      }
      ctx.textAlign = 'left';
    }
    ctx.restore();
    rounded(x, y, width, height, 44, null, ink, 4);
    font(28, 700);
    const badgeWidth = ctx.measureText(role.label).width + 60;
    const badgeX = x + (width - badgeWidth) / 2;
    rounded(badgeX, y + 484, badgeWidth, 56, 28, isMulti ? multicolor(badgeX, y + 484, badgeWidth) : accent, ink, 3);
    ctx.textAlign = 'center';
    text(role.label, x + width / 2, y + 522, 28, 700, !isMulti && ['blue', 'red'].includes(colorName) ? '#fff' : ink);
    ctx.textAlign = 'left';

    ctx.drawImage(assets.gdg, 64, 1189, 382, 45.85);
    rounded(478, 1169, 538, 86, 0, isMulti ? '#fff' : {blue:'#c3ecf6',green:'#ccf6c5',yellow:'#ffe7a5',red:'#f8d8d8',rose:'#f8d8e8'}[colorName]);
    ctx.save();
    font(34, 700);
    const websiteText = 'devfest26.gdglebanon.com';
    const websiteMetrics = ctx.measureText(websiteText);
    ctx.textAlign = 'center';
    const websiteBaseline = 1169 + 86 / 2 + (websiteMetrics.actualBoundingBoxAscent - websiteMetrics.actualBoundingBoxDescent) / 2;
    text(websiteText, 478 + 538 / 2, websiteBaseline, 34, 700);
    ctx.restore();
    if (isMulti) { ctx.fillStyle = multicolor(478, 1249, 538); ctx.fillRect(478, 1249, 538, 6); }
    ctx.strokeStyle = '#bdc7cb'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(64, 1280); ctx.lineTo(1016, 1280); ctx.stroke();
    text('MEA Conference Center, Beirut', 64, 1320, 25, 500);
    ctx.textAlign = 'right'; text('Saturday, November 28, 2026', 1016, 1320, 25, 500); ctx.textAlign = 'left';
    canvas.setAttribute('aria-label', `${heading} DevFest Beirut 2026 banner for ${name || 'your name'}, ${isMulti ? 'Google multicolor' : colorName}. November 28 at MEA Conference Center.`);
    field('color-note').textContent = `${role.label} · ${isMulti ? 'Google multicolor' : colorName[0].toUpperCase() + colorName.slice(1)}`;
  }

  const scheduleDraw = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  };
  const syncDownload = () => {
    download.disabled = !ready || photoLoading || exporting;
    download.textContent = exporting ? 'Creating your PNG…' : photoLoading ? 'Loading your image…' : ready ? 'Download my banner' : 'Loading your banner…';
  };
  const resetFraming = () => {
    field('zoom').value = '1'; field('x').value = '50';
    field('y').value = field('fit').value === 'contain' ? '50' : '35';
    scheduleDraw();
  };
  const updateRole = () => {
    const organization = !!roles[field('role').value].organization;
    field('name-label').textContent = organization ? 'Organization name' : 'Full name';
    field('name').placeholder = organization ? 'Your organization' : 'Your name';
    field('name').autocomplete = organization ? 'organization' : 'name';
    field('photo-label').innerHTML = `${organization ? 'Your logo or photo' : 'Your photo'} <span>(optional)</span>`;
    if (organization !== previousOrganization) {
      field('fit').value = organization ? 'contain' : 'cover';
      resetFraming();
    }
    previousOrganization = organization;
    scheduleDraw();
  };
  field('role').addEventListener('change', updateRole);
  field('fit').addEventListener('change', resetFraming);
  field('reset-photo').addEventListener('click', resetFraming);
  form.addEventListener('input', event => {
    if (event.target === field('photo')) return;
    message(status, 'Your preview updates as you edit.');
    scheduleDraw();
  });
  field('name').addEventListener('input', () => field('name').setCustomValidity(''));

  field('photo').addEventListener('change', async () => {
    const file = field('photo').files[0];
    if (!file) return;
    const request = ++photoRequest;
    photoLoading = false;
    syncDownload();
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 15 * 1024 * 1024) {
      message(field('photo-status'), 'Choose a JPG, PNG or WebP image smaller than 15 MB.', true);
      field('photo').value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    photoLoading = true; syncDownload();
    message(field('photo-status'), 'Loading your image…');
    try {
      const loaded = await loadImage(url);
      if (request !== photoRequest) return;
      photo = loaded;
      resetFraming();
      field('photo-controls').hidden = false;
      dragZone.hidden = false;
      message(field('photo-status'), 'Image ready. Drag it in the preview or adjust the framing below.');
      scheduleDraw();
    } catch {
      if (request !== photoRequest) return;
      field('photo').value = '';
      message(field('photo-status'), 'This image could not be opened. Please try another JPG, PNG or WebP.', true);
    } finally {
      URL.revokeObjectURL(url);
      if (request === photoRequest) { photoLoading = false; syncDownload(); }
    }
  });
  field('remove-photo').addEventListener('click', () => {
    photoRequest += 1; photo = null; photoLoading = false;
    field('photo').value = ''; field('photo-controls').hidden = true;
    dragZone.hidden = true;
    message(field('photo-status'), 'Image removed. Your initials will appear on the banner.');
    syncDownload(); scheduleDraw(); field('photo').focus();
  });

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  dragZone.addEventListener('pointerdown', event => {
    if (!photo || event.button !== 0) return;
    const size = photoSize();
    drag = {
      id: event.pointerId, startX: event.clientX, startY: event.clientY,
      x: Number(field('x').value), y: Number(field('y').value),
      scale: 1080 / canvas.getBoundingClientRect().width,
      spanX: 390 - size.width, spanY: 520 - size.height,
    };
    dragZone.setPointerCapture(event.pointerId);
    dragZone.classList.add('is-dragging');
    event.preventDefault();
  });
  dragZone.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    if (Math.abs(drag.spanX) > 1) field('x').value = String(clamp(drag.x + (event.clientX - drag.startX) * drag.scale / drag.spanX * 100, 0, 100));
    if (Math.abs(drag.spanY) > 1) field('y').value = String(clamp(drag.y + (event.clientY - drag.startY) * drag.scale / drag.spanY * 100, 0, 100));
    scheduleDraw();
  });
  const endDrag = () => { drag = null; dragZone.classList.remove('is-dragging'); };
  dragZone.addEventListener('pointerup', endDrag);
  dragZone.addEventListener('pointercancel', endDrag);
  dragZone.addEventListener('lostpointercapture', endDrag);
  dragZone.addEventListener('wheel', event => {
    if (!photo || !event.deltaY) return;
    event.preventDefault();
    field('zoom').value = String(clamp(Number(field('zoom').value) - Math.sign(event.deltaY) * .1, .5, 3));
    scheduleDraw();
  }, { passive: false });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!ready || photoLoading || exporting) return;
    if (!clean(field('name'))) {
      field('name').setCustomValidity('Enter a name for your banner.');
      field('name').reportValidity(); return;
    }
    exporting = true; syncDownload();
    try {
      draw();
      const blob = await new Promise((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Export failed')), 'image/png'));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const name = clean(field('name')).normalize('NFKD').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 70) || 'my-banner';
      link.href = url; link.download = `devfest-beirut-2026-${field('role').value}-${name.toLowerCase()}.png`;
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      message(status, 'Your 1080 × 1350 PNG is ready. Share it with your community!');
    } catch {
      message(status, 'The PNG could not be created. Please try again.', true);
    } finally { exporting = false; syncDownload(); }
  });

  async function initialize() {
    try {
      await Promise.all([
        ...Object.entries({ lockup: 'devfest-lockup.svg', flag: 'lebanon-flag.svg', coast: 'beirut-coast.svg', gdg: 'gdg-wordmark.svg' }).map(async ([key, filename]) => { assets[key] = await loadImage(`assets/banner/${filename}`); }),
        ...[[400, 'regular'], [500, 'medium'], [700, 'bold']].map(async ([weight, name]) => {
          const face = new FontFace('DevFest Banner', `url(assets/banner/google-sans-${name}.woff2)`, { weight: String(weight) });
          document.fonts.add(await face.load());
        }),
      ]);
      if (!ctx) throw new Error('Canvas is unavailable');
      ready = true; updateRole(); draw(); syncDownload();
      message(status, 'Add your name to download. A photo is optional.');
    } catch {
      download.textContent = 'Banner unavailable';
      message(status, 'The banner artwork could not load. Refresh the page to try again.', true);
    }
  }
  initialize();
})();
