(function () {
  'use strict';

  // v66: do not let the browser restore a slightly scrolled START position.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const content = window.SITE_CONTENT || {};
  const MAX_IMAGES = 11;

  // v76: German/original is the default. English is an optional overlay:
  // whenever a *_en value is missing, the original value stays visible.
  const urlLanguage = new URLSearchParams(window.location.search).get('lang');
  let currentLanguage = urlLanguage === 'en' ? 'en' : (urlLanguage === 'de' ? 'de' : (localStorage.getItem('gerberngestalt-language') === 'en' ? 'en' : 'de'));

  function syncLanguageUrl() {
    const url = new URL(window.location.href);
    if (currentLanguage === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
  }
  const MONTHS_EN = {
    JANUAR:'JANUARY', FEBRUAR:'FEBRUARY', 'MÄRZ':'MARCH', APRIL:'APRIL',
    MAI:'MAY', JUNI:'JUNE', JULI:'JULY', AUGUST:'AUGUST',
    SEPTEMBER:'SEPTEMBER', OKTOBER:'OCTOBER', NOVEMBER:'NOVEMBER', DEZEMBER:'DECEMBER'
  };
  const NAV_LABELS = {
    de:{start:'START',about:'ÜBER MICH',angebot:'ANGEBOT',praktisches:'PRAKTISCHES',gestalt:'GESTALT',kontakt:'KONTAKT',netzwerk:'NETZWERK',imprint:'IMPRESSUM',privacy:'DATENSCHUTZ'},
    en:{start:'HOME',about:'ABOUT ME',angebot:'WHAT I DO',praktisches:'PRACTICALITIES',gestalt:'GESTALT',kontakt:'CONTACT',netzwerk:'NETWORK',imprint:'LEGAL',privacy:'PRIVACY'}
  };

  function localized(obj, key) {
    if (!obj) return '';
    const enKey = key + '_en';
    return currentLanguage === 'en' && obj[enKey] != null ? obj[enKey] : obj[key];
  }

  function galleryImageSpec(data, entry, index) {
    if (entry && typeof entry === 'object') {
      return { base:entry.image || '', en:entry.image_en || '', alt:localized(entry,'alt') || '' };
    }
    const enList = Array.isArray(data.images_en) ? data.images_en : [];
    const altList = currentLanguage === 'en' && Array.isArray(data.alt_en) ? data.alt_en : (Array.isArray(data.alt) ? data.alt : []);
    return { base:entry || '', en:enList[index] || '', alt:altList[index] || '' };
  }

  function desiredImageName(spec) {
    return currentLanguage === 'en' && spec.en ? spec.en : spec.base;
  }

  // v52: one random saturated-pastel original dot image per page load.
  // Clicking the large navigation dot chooses a different colour AND returns to START.
  function stoneSvg(base, light, dark, variant) {
    const outlines = [
      'M12 9 C22 2 39 3 48 11 C57 19 57 38 48 48 C39 57 20 58 10 49 C2 41 3 20 12 9 Z',
      'M9 15 C17 4 34 1 46 8 C57 15 61 31 54 43 C48 54 31 60 17 54 C5 49 1 27 9 15 Z',
      'M14 7 C27 1 44 5 52 16 C60 28 55 45 44 52 C31 60 14 54 7 43 C0 31 4 13 14 7 Z',
      'M8 13 C18 3 37 2 49 10 C60 18 58 37 51 47 C43 58 23 59 12 51 C2 43 0 22 8 13 Z'
    ];
    const path = outlines[variant % outlines.length];
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><clipPath id="c"><path d="'+path+'"/></clipPath></defs>' +
      '<g clip-path="url(#c)"><rect width="64" height="64" fill="'+base+'"/>' +
      '<path d="M0 0 H64 L38 31 L0 24 Z" fill="'+light+'"/>' +
      '<path d="M64 64 H0 L27 30 L64 22 Z" fill="'+dark+'"/></g></svg>'
    );
  }

  const ACCENT_DOTS = [
    { colour:'#EC9F69', file:'images/stones/apricot-stone.png' },
    { colour:'#ED917F', file:'images/stones/coral-stone.png' },
    { colour:'#B49AE2', file:'images/stones/lavender-stone.png' },
    { colour:'#E7B34C', file:'images/stones/mustard-stone.png' },
    { colour:'#F0ACB7', file:'images/stones/rose-stone.png' },
    { colour:'#94B293', file:'images/stones/sage-stone.png' },
    { colour:'#7CACE5', file:'images/stones/sky-stone.png' },
    { colour:'#73C6BD', file:'images/stones/turquoise-stone.png' }
  ];

  let accentDot = ACCENT_DOTS[Math.floor(Math.random() * ACCENT_DOTS.length)];

  function applyAccent(dot) {
    accentDot = dot;
    document.documentElement.style.setProperty('--accent', dot.colour);
    const image = document.querySelector('.mark-dot');
    if (image) {
      image.onerror = null;
      image.src = dot.file;
    }
  }

  function chooseDifferentAccent() {
    const alternatives = ACCENT_DOTS.filter(function (dot) { return dot.file !== accentDot.file; });
    applyAccent(alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  applyAccent(accentDot);

  const colourDot = document.querySelector('.mark');
  const whatDot = document.querySelector('.misc-divider-dot');

  function scrollToElement(el, hash) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (history.replaceState) history.replaceState(null, '', hash);
  }

  // Touch labels: show briefly after a tap, then disappear automatically.
  function flashTouchLabel(button) {
    /* v66: no so?/what! labels on touch devices. Hover labels belong to real pointers only. */
    if (!button) return;
    button.classList.remove('touch-label-visible');
  }

  // so? changes the palette and leads to what! at the bottom.
  if (colourDot) {
    colourDot.addEventListener('click', function () {
      chooseDifferentAccent();
      flashTouchLabel(colourDot);
      colourDot.blur();
      /* gerberngestalt: the stone changes the accent but stays in place. */
    });
  }

  // what! changes the palette and returns to the exact fitted START state.
  // Important: make START authoritative *before* fitting it.  Otherwise the
  // scroll bookkeeping can still regard MISC as the active gallery while the
  // page is travelling back from the bottom.
  if (whatDot) {
    whatDot.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      chooseDifferentAccent();
      flashTouchLabel(whatDot);
      whatDot.blur();

      const start = document.getElementById('start');
      const startGroup = start && start.querySelector('.window-group');
      if (startGroup) activeGallery = startGroup;
      if (history.replaceState) history.replaceState(null, '', '#start');

      // fitStartToViewport itself establishes scrollY=0, so do not start a
      // competing smooth-scroll animation here.  Re-measure once after layout
      // has settled; this is the same geometry used by the working START link.
      fitStartToViewport();
      requestAnimationFrame(function () {
        fitStartToViewport();
        window.scrollTo({ top:0, left:0, behavior:'auto' });
      });
    });
  }

  function buildGallery(carousel) {
    const key = carousel.dataset.gallery;
    const data = content[key] || {};
    const images = Array.isArray(data.images) ? data.images.slice(0, MAX_IMAGES) : [];
    const track = carousel.querySelector('.track');
    const dots = carousel.querySelector('.dots');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    track.innerHTML = '';
    dots.innerHTML = '';
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carousel');
    carousel.setAttribute('aria-label', (NAV_LABELS[currentLanguage][key] || key) + ' Bildergalerie');
    track.setAttribute('tabindex', '0');
    track.setAttribute('aria-label', 'Bilder mit Pfeiltasten wechseln');

    if (!images.length) {
      const empty = document.createElement('div');
      empty.className = 'slide empty';
      empty.textContent = 'BILD';
      track.appendChild(empty);
      prev.hidden = true;
      next.hidden = true;
      dots.hidden = true;
      return;
    }

    images.forEach(function (name, index) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (index + 1) + ' von ' + images.length);
      const img = document.createElement('img');
      const spec = galleryImageSpec(data, name, index);
      img.dataset.galleryKey = key;
      img.dataset.imageIndex = String(index);
      img.dataset.baseName = spec.base;
      img.dataset.enName = spec.en;
      const wantedName = desiredImageName(spec);
      img.src = /^https?:\/\//i.test(wantedName) ? wantedName : 'https://raw.githubusercontent.com/gerberndrei/gerberndrei.github.io/main/images/' + key + '/' + wantedName;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = spec.alt;
      img.onerror = function () {
        // An optional image_en may already be written in content.js before the
        // actual file is uploaded. In that case silently use the DE/base image.
        if (currentLanguage === 'en' && img.dataset.enName && !img.dataset.fellBack) {
          img.dataset.fellBack = '1';
          img.src = 'https://raw.githubusercontent.com/gerberndrei/gerberndrei.github.io/main/images/' + key + '/' + img.dataset.baseName;
          return;
        }
        slide.classList.add('missing');
        slide.textContent = 'DATEI NICHT GEFUNDEN\n' + img.dataset.baseName;
      };
      slide.appendChild(img);
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Bild ' + (index + 1));
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(index); });
      dots.appendChild(dot);
    });

    if (images.length === 1) {
      prev.hidden = true;
      next.hidden = true;
      dots.hidden = true;
      return;
    }

    dots.hidden = false;
    let index = 0;

    function slideWidth() { return track.clientWidth || 1; }
    function goTo(i) {
      index = Math.max(0, Math.min(images.length - 1, i));
      track.scrollTo({ left: index * slideWidth(), behavior: 'smooth' });
      update();
    }
    function update() {
      index = Math.max(0, Math.min(images.length - 1, Math.round(track.scrollLeft / slideWidth())));
      Array.from(dots.children).forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
        if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
      });
      prev.hidden = index === 0;
      next.hidden = index === images.length - 1;
    }

    prev.addEventListener('click', function (event) { event.stopPropagation(); goTo(index - 1); });
    next.addEventListener('click', function (event) { event.stopPropagation(); goTo(index + 1); });
    track.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(index - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(index + 1); }
    });

    // On devices with a real cursor, clicking the image advances one slide.
    // Touch devices keep their native swipe behaviour and do not advance on a tap.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      track.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG' && index < images.length - 1) goTo(index + 1);
      });
    }

    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });

    // Keep the selected slide locked when responsive sizing changes the window width.
    // Without this, the old pixel scrollLeft can land between slides during resize.
    let resizeFrame = 0;
    const keepSlideLocked = function () {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(function () {
        track.scrollTo({ left: index * slideWidth(), behavior: 'auto' });
        update();
      });
    };
    window.addEventListener('resize', keepSlideLocked, { passive: true });
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(keepSlideLocked);
      ro.observe(track);
    }
    update();
  }

  document.querySelectorAll('.carousel[data-gallery]').forEach(buildGallery);
  const past = document.getElementById('past-events');
  const network = document.getElementById('network-links');

  function translateMonth(dateText) {
    if (currentLanguage !== 'en') return dateText;
    return dateText.replace(/^([A-ZÄÖÜ]+)(\b|\s)/, function (whole, month, boundary) {
      return (MONTHS_EN[month] || month) + boundary;
    });
  }

  function renderPastEvents() {
    if (!past) return;
    past.innerHTML = '';
    const source = currentLanguage === 'en' && content.pastEvents_en != null ? content.pastEvents_en : content.pastEvents;
    const pastLines = String(source || '').split(/\r?\n/);
    let previousWasYear = false;
    pastLines.forEach((raw, i) => {
      const line = raw.trim();
      if (!line) {
        if (!previousWasYear && i < pastLines.length - 1) {
          const gap = document.createElement('div'); gap.className = 'past-block-gap'; past.appendChild(gap);
        }
        previousWasYear = false; return;
      }
      if (/^\d{4}$/.test(line)) {
        const year = document.createElement('div'); year.className = 'past-year'; year.textContent = '\u00A0\u00A0' + line; past.appendChild(year);
        previousWasYear = true; return;
      }
      previousWasYear = false;
      const m = line.match(/^([^:]+):\s*(.*)$/);
      if (m) {
        const dateText = translateMonth(m[1]);
        const row = document.createElement('div'); row.className = 'past-row';
        const date = document.createElement('span'); date.textContent = dateText;
        const sep = document.createElement('span'); sep.className = 'list-separator past-separator'; sep.textContent = '–';
        const desc = document.createElement('span'); desc.textContent = m[2];
        const mobileLine = document.createElement('span'); mobileLine.className = 'past-mobile-line';
        const mobileDate = document.createElement('span'); mobileDate.className = 'past-mobile-date'; mobileDate.textContent = dateText;
        const mobileDesc = document.createElement('span'); mobileDesc.className = 'past-mobile-desc'; mobileDesc.textContent = m[2];
        mobileLine.append(mobileDate, mobileDesc);
        row.append(date, sep, desc, mobileLine); past.appendChild(row);
      } else {
        const row = document.createElement('div'); row.textContent = line; past.appendChild(row);
      }
    });
  }

  function renderNetwork() {
    network.innerHTML = '';
    const links = Array.isArray(content.network) ? content.network : [];
    links.forEach(function (item) {
      const row = document.createElement('div'); row.className = 'network-row';
      const labelText = localized(item, 'label');
      const url = localized(item, 'url') || item.url;
      const display = localized(item, 'display') || item.display;
      const email = localized(item, 'email') || item.email;
      const label = document.createElement('span'); label.className = 'network-label'; label.textContent = labelText ? '\u00A0\u00A0' + labelText : ''; row.appendChild(label);
      if (labelText) { const sep = document.createElement('span'); sep.className = 'list-separator'; sep.textContent = '|'; row.appendChild(sep); }
      if (url) {
        const a = document.createElement('a'); a.href = url; a.textContent = display || url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
        if (/^https?:\/\//i.test(a.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } row.appendChild(a);
      }
      if (email) { const a = document.createElement('a'); a.href = 'mailto:' + email; a.textContent = email; row.appendChild(a); }
      network.appendChild(row);
      if (item.spaceAfter) {
      const gap = document.createElement('div');
      gap.className = 'network-block-gap';
      network.appendChild(gap);
}
    });
  }

  renderPastEvents();
  renderNetwork();


  function updateGalleryLanguage() {
    document.querySelectorAll('.carousel[data-gallery]').forEach(function (carousel) {
      const key = carousel.dataset.gallery;
      const data = content[key] || {};
      const entries = Array.isArray(data.images) ? data.images.slice(0, MAX_IMAGES) : [];
      carousel.querySelectorAll('.slide img').forEach(function (img, index) {
        const spec = galleryImageSpec(data, entries[index], index);
        const slide = img.closest('.slide');
        if (slide) slide.classList.remove('missing');
        delete img.dataset.fellBack;
        img.dataset.baseName = spec.base;
        img.dataset.enName = spec.en;
        img.alt = spec.alt;
        const wanted = desiredImageName(spec);
        if (wanted) img.src = /^https?:\/\//i.test(wanted) ? wanted : 'https://raw.githubusercontent.com/gerberndrei/gerberndrei.github.io/main/images/' + key + '/' + wanted;
      });
    });
  }

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el && value != null) el.textContent = value;
  }

  function applyLanguage() {
    const labels = NAV_LABELS[currentLanguage];
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('gerberngestalt-language', currentLanguage);
    syncLanguageUrl();

    ['start','about','angebot','praktisches','gestalt'].forEach(function (id) {
      setText('.primary-nav a[href="#' + id + '"]', labels[id]);
      const data = content[id] || {};
      const title = localized(data, 'title');
      setText('#' + id + ' .section-title', currentLanguage === 'en' && data.title_en == null ? labels[id] : title);
    });
    setText('.secondary-nav a[href="#kontakt"]', labels.kontakt);
    setText('.secondary-nav a[href="#netzwerk"]', labels.netzwerk);
    setText('#kontakt .section-title', labels.kontakt);
    setText('#netzwerk .section-title', labels.netzwerk);
    setText('#legal-imprint-title', labels.imprint);
    setText('#legal-privacy-title', labels.privacy);

    const legal = content.legal || {};
    setText('#legal-imprint-text', localized(legal, 'imprint') || 'Hier kommt dein kurzes Impressum hin.');
    setText('#legal-privacy-text', localized(legal, 'privacy') || 'Hier kommt deine kurze Datenschutzerklärung hin.');

    const toggle = document.querySelector('.language-toggle');
    if (toggle) {
      toggle.textContent = currentLanguage === 'de' ? 'EN' : 'DE';
      toggle.setAttribute('aria-label', currentLanguage === 'de' ? 'Switch to English' : 'Zur deutschen Version wechseln');
    }

    const topTip = document.querySelector('.mark-tooltip');
    const bottomTip = document.querySelector('.misc-divider-tooltip');
    if (topTip) topTip.textContent = currentLanguage === 'de' ? 'na?' : 'so?';
    if (bottomTip) bottomTip.textContent = currentLanguage === 'de' ? 'und!' : 'what!';

    renderPastEvents();
    renderNetwork();
    updateGalleryLanguage();
    document.querySelectorAll('.carousel[data-gallery]').forEach(function (carousel) {
      const key = carousel.dataset.gallery;
      carousel.setAttribute('aria-label', (NAV_LABELS[currentLanguage][key] || key) + (currentLanguage === 'en' ? ' image gallery' : ' Bildergalerie'));
      const track = carousel.querySelector('.track');
      if (track) track.setAttribute('aria-label', currentLanguage === 'en' ? 'Use arrow keys to change image' : 'Bilder mit Pfeiltasten wechseln');
    });
  }

  const languageToggle = document.querySelector('.language-toggle');
  if (languageToggle) languageToggle.addEventListener('click', function () {
    currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
    applyLanguage();
  });

  applyLanguage();


  // Gallery navigation: title + image + dots are one visual unit.
  // During a browser resize, the section named in the URL hash is authoritative.
  // This avoids scroll events generated by Chrome's maximize/restore operation
  // accidentally switching the active gallery while the viewport is changing.
  let activeGallery = null;
  let resizeInProgress = false;
  let resizeSettleTimer = 0;

  function fitStartToViewport() {
    if (window.matchMedia('(max-width:900px), (pointer:coarse)').matches) return;
    const start = document.getElementById('start');
    const group = start && start.querySelector('.window-group');
    if (!group) return;

    /* START has one geometry only: at scrollY 0 the complete unit
       (title + square + gallery dots) must fit inside the visible viewport.
       Because the unit is vertically centred, reducing its width moves its
       top down as well; therefore we measure again after every reduction. */
    group.style.width = '';
    group.style.maxWidth = '';

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    void group.offsetHeight;

    const foot = document.querySelector('.fixed-foot');
    const footH = foot ? foot.getBoundingClientRect().height : 0;
    const bottomLimit = window.innerHeight - footH - 8;

    for (let pass = 0; pass < 5; pass += 1) {
      const r = group.getBoundingClientRect();
      const overflow = r.bottom - bottomLimit;
      if (overflow <= 0.5) break;
      const fitted = Math.max(180, r.width - (overflow * 2) - 3);
      group.style.width = fitted + 'px';
      group.style.maxWidth = fitted + 'px';
      void group.offsetHeight;
    }

    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
  }

  function galleryLimits() {
    const mobile = window.matchMedia('(max-width: 650px)').matches;
    if (mobile) {
      const head = document.querySelector('.fixed-head');
      const headH = head ? head.getBoundingClientRect().height : 0;
      return { top: headH + 22, bottom: window.innerHeight - 4 };
    }
    const head = document.querySelector('.fixed-head');
    const headH = head ? head.getBoundingClientRect().height : 0;
    const underStrip = 34.02; // 9 mm white finish below navigation
    return { top: headH + underStrip, bottom: window.innerHeight - 4 };
  }

  function galleryFromHash() {
    const id = location.hash;
    if (!id) return null;
    const section = document.querySelector(id);
    return section && section.classList.contains('section') ? section.querySelector('.window-group') : null;
  }

  function chooseActiveGallery() {
    const hashed = galleryFromHash();
    if (hashed) { activeGallery = hashed; return activeGallery; }
    const limits = galleryLimits();
    const viewportCenter = (limits.top + limits.bottom) / 2;
    let best = null;
    let bestOverlap = -1;
    let bestDistance = Infinity;
    document.querySelectorAll('.section .window-group').forEach(function (group) {
      const r = group.getBoundingClientRect();
      const overlap = Math.max(0, Math.min(r.bottom, limits.bottom) - Math.max(r.top, limits.top));
      const distance = Math.abs(((r.top + r.bottom) / 2) - viewportCenter);
      if (overlap > bestOverlap || (overlap === bestOverlap && distance < bestDistance)) {
        best = group; bestOverlap = overlap; bestDistance = distance;
      }
    });
    if (best && bestOverlap > 0) activeGallery = best;
    return activeGallery;
  }

  function centerGallery(group) {
    if (!group || !document.documentElement.contains(group)) return;
    if (group.closest('#start') && !window.matchMedia('(max-width:900px), (pointer:coarse)').matches) { fitStartToViewport(); window.scrollTo({top:0,left:0,behavior:'auto'}); return; }
    const limits = galleryLimits();
    const available = limits.bottom - limits.top;
    const r = group.getBoundingClientRect();
    if (r.height > available) return;
    const desiredTop = limits.top + (available - r.height) / 2;
    const absoluteTop = window.scrollY + r.top;
    const wantedScroll = Math.max(0, absoluteTop - desiredTop);
    window.scrollTo({ top: wantedScroll, left: 0, behavior: 'auto' });
  }

  function keepWholeGalleryVisible(group) {
    if (!group || !document.documentElement.contains(group)) return;
    const limits = galleryLimits();
    const r = group.getBoundingClientRect();
    const pad = 10;
    if (r.bottom > limits.bottom - pad) {
      window.scrollBy({ top: r.bottom - (limits.bottom - pad), left: 0, behavior: 'auto' });
    }
    const r2 = group.getBoundingClientRect();
    if (r2.top < limits.top + pad && r2.height <= (limits.bottom - limits.top - 2 * pad)) {
      window.scrollBy({ top: r2.top - (limits.top + pad), left: 0, behavior: 'auto' });
    }
  }

  let scrollPickTimer = 0;
  if (!window.matchMedia('(max-width:900px), (pointer:coarse)').matches) {
    window.addEventListener('scroll', function () {
      if (resizeInProgress) return;
      window.clearTimeout(scrollPickTimer);
      scrollPickTimer = window.setTimeout(chooseActiveGallery, 70);
    }, { passive:true });
  }

  function settleResize() {
    // Mobile Chrome changes visualViewport height while its browser chrome moves.
    // Re-centering the page on every one of those pseudo-resizes fights the user's
    // finger and causes the visible jump/jitter on a fast swipe. On touch/mobile
    // layouts scrolling must stay completely native.
    if (window.matchMedia('(max-width: 900px), (pointer: coarse)').matches) return;
    resizeInProgress = true;
    window.clearTimeout(resizeSettleTimer);

    // Windows/Chrome restore/maximize can rebuild the viewport in several passes.
    // Keep the explicitly selected/hash gallery authoritative throughout that
    // sequence and re-center it after each likely layout pass.
    const target = galleryFromHash() || activeGallery || chooseActiveGallery();
    if (target) activeGallery = target;

    [0, 80, 180, 320, 520, 800, 1200].forEach(function (delay) {
      window.setTimeout(function () {
        const wanted = galleryFromHash() || activeGallery;
        if (!wanted) return;
        window.requestAnimationFrame(function () { centerGallery(wanted); });
      }, delay);
    });

    resizeSettleTimer = window.setTimeout(function () {
      const wanted = galleryFromHash() || activeGallery || chooseActiveGallery();
      if (wanted) {
        activeGallery = wanted;
        centerGallery(wanted);
      }
      resizeInProgress = false;
    }, 1350);
  }
  window.addEventListener('resize', settleResize, { passive:true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', settleResize, { passive:true });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      // On phones the navigation remains fixed, so all anchor targets reserve
      // the actual current header height (portrait or compact landscape).
      const mobile = window.matchMedia('(max-width: 650px)').matches;
      if (mobile && (target.classList.contains('section') || id === '#kontakt' || id === '#netzwerk')) {
        event.preventDefault();
        if (history.replaceState) history.replaceState(null, '', id);
        const head = document.querySelector('.fixed-head');
        const headH = head ? head.getBoundingClientRect().height : 0;
        const top = window.scrollY + target.getBoundingClientRect().top - headH - 22;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        if (secondaryPast) secondaryPast.classList.toggle('active-secondary', id === '#kontakt');
        if (secondaryNetwork) secondaryNetwork.classList.toggle('active-secondary', id === '#netzwerk');
        return;
      }

      // Reading sections (PAST EVENTS / NETZWERK) need their title to remain
      // visibly below the fixed header + 9 mm white finish. Native anchor
      // scrolling would otherwise tuck the title underneath the header.
      if (id === '#netzwerk') {
        event.preventDefault();
        if (history.replaceState) history.replaceState(null, '', id);
        const head = document.querySelector('.fixed-head');
        const headH = head ? head.getBoundingClientRect().height : 0;
        const underStrip = 34.02; // 9 mm
        const breathingRoom = 22;
        const top = window.scrollY + target.getBoundingClientRect().top - headH - underStrip - breathingRoom;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        if (secondaryPast) secondaryPast.classList.toggle('active-secondary', id === '#kontakt');
        if (secondaryNetwork) secondaryNetwork.classList.toggle('active-secondary', id === '#netzwerk');
        return;
      }

      if (!target.classList.contains('section')) return;
      const group = target.querySelector('.window-group');
      if (!group) return;
      event.preventDefault();
      activeGallery = group;
      if (id === '#start' && !window.matchMedia('(max-width:900px), (pointer:coarse)').matches) {
        if (history.replaceState) history.replaceState(null, '', id);
        fitStartToViewport();
        window.scrollTo({top:0,left:0,behavior:'smooth'});
        return;
      }
      if (history.replaceState) history.replaceState(null, '', id);
      const limits = galleryLimits();
      const available = Math.max(0, limits.bottom - limits.top);
      const groupH = group.getBoundingClientRect().height;
      const desiredTop = limits.top + Math.max(0, (available - groupH) / 2);
      /* CONTACT is the final gallery before the reading section. Give it the
         same visual top as the other galleries instead of letting end-of-page
         geometry leave it about one text line too low. */
      const clickTopCorrection = id === '#kontakt' ? 22 : 0;
      const targetTop = window.scrollY + group.getBoundingClientRect().top - desiredTop + clickTopCorrection;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      if (!window.matchMedia('(max-width:900px), (pointer:coarse)').matches) {
        [180, 420, 760].forEach(function (delay) {
          window.setTimeout(function () { keepWholeGalleryVisible(group); }, delay);
        });
      }
    });
  });
  activeGallery = galleryFromHash() || chooseActiveGallery();
  if (!location.hash || location.hash === '#start') {
    // START is a fitted first screen, never a remembered scroll position.
    window.scrollTo({top:0,left:0,behavior:'auto'});
    requestAnimationFrame(function(){
      fitStartToViewport();
      window.scrollTo({top:0,left:0,behavior:'auto'});
      requestAnimationFrame(function(){ window.scrollTo({top:0,left:0,behavior:'auto'}); });
    });
    fitStartToViewport();
    if (!window.matchMedia('(max-width:900px), (pointer:coarse)').matches) window.scrollTo({top:0,left:0,behavior:'auto'});
  }


  // Navigation marker: the yellow dot follows the section that actually
  // occupies the centre of the visible browser area. This prevents KONTAKT
  // from staying active once PAST EVENTS has reached the reading position.
  const primaryIds = ['start', 'about', 'angebot', 'praktisches', 'gestalt'];
  const primaryLinks = Array.from(document.querySelectorAll('.primary-nav a'));
  const secondaryPast = document.querySelector('.secondary-nav a[href="#kontakt"]');
  const secondaryNetwork = document.querySelector('.secondary-nav a[href="#netzwerk"]');
  const navSectionIds = ['start', 'about', 'angebot', 'praktisches', 'gestalt', 'kontakt', 'netzwerk'];

  function currentNavSection() {
    const head = document.querySelector('.fixed-head');
    const mobile = window.matchMedia('(max-width: 650px)').matches;
    const headH = head ? head.getBoundingClientRect().height : 0;

    // For the reading sections use a stable reading line just below the fixed
    // navigation. This keeps NETZWERK active for its whole section instead of
    // letting a short section lose its dot immediately to the following gap.
    const readingY = headH + 34.02 + 24;
    const pastSection = document.getElementById('kontakt');
    const networkSection = document.getElementById('netzwerk');
    if (networkSection) {
      const nr = networkSection.getBoundingClientRect();
      if (nr.top <= readingY && nr.bottom > readingY) return 'netzwerk';
    }
    if (pastSection && networkSection) {
      const pr = pastSection.getBoundingClientRect();
      const nr = networkSection.getBoundingClientRect();
      if (pr.top <= readingY && nr.top > readingY) return 'kontakt';
    }

    const y = headH + (window.innerHeight - headH) / 2;

    for (const id of navSectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      const r = section.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) return id;
    }

    // Fallback for gaps between sections: choose the nearest section centre.
    let nearest = null;
    let nearestDistance = Infinity;
    navSectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (!section) return;
      const r = section.getBoundingClientRect();
      const distance = Math.abs((r.top + r.bottom) / 2 - y);
      if (distance < nearestDistance) { nearestDistance = distance; nearest = id; }
    });
    return nearest;
  }

  function updateNavDots() {
    const activeId = currentNavSection();

    primaryLinks.forEach(function (link) {
      link.classList.toggle('active-section', link.getAttribute('href') === '#' + activeId);
    });

    if (secondaryPast) secondaryPast.classList.toggle('active-secondary', activeId === 'kontakt');
    if (secondaryNetwork) secondaryNetwork.classList.toggle('active-secondary', activeId === 'netzwerk');
  }

  // On phones, doing several getBoundingClientRect() reads on every raw scroll
  // event can interrupt Chrome's inertial fling. Limit navigation bookkeeping to
  // at most one animation frame and never write scroll position from this path.
  let navDotFrame = 0;
  function scheduleNavDotUpdate() {
    if (navDotFrame) return;
    navDotFrame = window.requestAnimationFrame(function () {
      navDotFrame = 0;
      updateNavDots();
    });
  }
  const touchLayout = window.matchMedia('(max-width:900px), (pointer:coarse)').matches;
  let touchScrollTimer = 0;
  if (touchLayout) {
    window.addEventListener('scroll', function () {
      window.clearTimeout(touchScrollTimer);
      touchScrollTimer = window.setTimeout(updateNavDots, 180);
    }, { passive:true });
  } else {
    window.addEventListener('scroll', scheduleNavDotUpdate, { passive:true });
  }
  window.addEventListener('resize', scheduleNavDotUpdate, { passive:true });
  updateNavDots();
})();

