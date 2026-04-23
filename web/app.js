// Data
const RELEASES = [
  {
    id: 'routine', cat: 'AWS-003', num: '03',
    title: 'ROUTINE', sub: 'Loops, drift, and the long walk home.',
    type: 'ALBUM', year: '2012', tag: 'LATEST',
    embed: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/awiredspine/sets/routine&color=%23E3301A&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    fallback: 'https://soundcloud.com/awiredspine'
  },
  {
    id: 'please', cat: 'AWS-002', num: '02',
    title: 'PLEASE, PLEASE!!!', sub: 'Insistence as composition.',
    type: 'ALBUM', year: '2010', tag: '',
    embed: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/awiredspine/sets/please-please&color=%23E3301A&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    fallback: 'https://soundcloud.com/awiredspine'
  },
  {
    id: 'interruptor', cat: 'AWS-001', num: '01',
    title: 'INTERRUPTOR', sub: 'First signal. The switch flipped.',
    type: 'EP', year: '2006', tag: 'DEBUT',
    embed: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/awiredspine/sets/interruptor&color=%23E3301A&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    fallback: 'https://soundcloud.com/awiredspine'
  }
];

const list = document.getElementById('rel-list');
if (list){
  RELEASES.forEach((r) => {
    const li = document.createElement('li');
    li.className = 'rel';
    li.dataset.id = r.id;
    li.innerHTML = `
      <div class="rel__cat">${r.cat}</div>
      <div class="rel__main">
        <div class="rel__title">${r.title}${r.tag ? `<span class="rel__tag">${r.tag}</span>` : ''}</div>
        <div class="rel__sub">${r.sub}</div>
      </div>
      <div class="rel__format">${r.type}</div>
      <div class="rel__year">${r.year}</div>
      <div class="rel__toggle" aria-label="Toggle player">+</div>
      <div class="rel__player" aria-hidden="true">
        <iframe loading="lazy" allow="autoplay" data-src="${r.embed}"></iframe>
        <div class="rel__caption">
          Can't see the player? Listen on <a href="${r.fallback}" target="_blank" rel="noopener">soundcloud.com/awiredspine ↗</a>
        </div>
      </div>
    `;
    list.appendChild(li);
  });

  // Expand the latest release on load so the player is ready.
  const latest = list.querySelector('.rel') &&
    (list.querySelector('.rel[data-id="' +
       (RELEASES.find(r => r.tag === 'LATEST') || RELEASES[0]).id + '"]'));
  if(latest){
    latest.classList.add('is-open');
    const iframe = latest.querySelector('iframe');
    if(iframe && !iframe.src){ iframe.src = iframe.dataset.src; }
  }

  list.addEventListener('click', (e) => {
    const li = e.target.closest('.rel');
    if(!li) return;
    const wasOpen = li.classList.contains('is-open');
    list.querySelectorAll('.rel.is-open').forEach(n => {
      n.classList.remove('is-open');
      const f = n.querySelector('iframe');
      if(f) f.removeAttribute('src');
    });
    if(!wasOpen){
      li.classList.add('is-open');
      const iframe = li.querySelector('iframe');
      if(iframe && !iframe.src){ iframe.src = iframe.dataset.src; }
    }
  });
}

// Clock in topbar
const clock = document.getElementById('clock');
function tick(){
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2,'0');
  const mm = String(d.getUTCMinutes()).padStart(2,'0');
  const ss = String(d.getUTCSeconds()).padStart(2,'0');
  if(clock) clock.textContent = `${hh}:${mm}:${ss}Z`;
}
tick(); setInterval(tick, 1000);

// Hero logo subtle parallax to mouse
const heroLogo = document.getElementById('heroLogo');
if (heroLogo){
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    heroLogo.style.setProperty('--tx', `${x}px`);
    heroLogo.style.setProperty('--ty', `${y}px`);
    heroLogo.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Hero title "virus" infection: random letters flicker to acid-red one by
// one until the whole name is infected, then glitch-snap back to bone,
// rest, and spread again. Word-level ::before/::after chromatic ghosts
// keep working because data-text lives on the .word element.
(function(){
  const title = document.querySelector('.hero__title');
  if(!title) return;
  // Shared parent of logo + title — used to broadcast infection state
  // classes so the logo can react in CSS while the name is being infected.
  const inner = title.closest('.hero__inner') || title.parentElement;
  // The orbit ring whose two red "electron" dots ride as pseudo-elements.
  // Direction is flipped randomly per letter infection.
  const ring = inner ? inner.querySelector('.hero__logo-ring') : null;
  const words = title.querySelectorAll('.word');
  const letters = [];
  // "Patient zero" pool: letters in every word except the last ("SPINE").
  // Infection always starts somewhere in "A WIRED", never in "SPINE".
  const seedLetters = [];
  const lastWordIndex = words.length - 1;
  words.forEach((w, wi) => {
    const text = w.textContent;
    [...w.childNodes].forEach(n => { if(n.nodeType === 3) w.removeChild(n); });
    for(const ch of text){
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      w.appendChild(span);
      letters.push(span);
      if(wi < lastWordIndex) seedLetters.push(span);
    }
  });
  if(!letters.length) return;

  // Pin each letter to its natural Archivo Black width AND pin the title's
  // natural height, so swapping to a different font on .infected can't
  // reflow the line horizontally or shift the whole page vertically —
  // which was causing mis-clicks on the SoundCloud player below.
  async function lockLayout(){
    if(document.fonts && document.fonts.ready) await document.fonts.ready;
    const hadInfected = letters.filter(l => l.classList.contains('infected'));
    hadInfected.forEach(l => l.classList.remove('infected'));
    letters.forEach(l => { l.style.width = ''; });
    title.style.height = '';
    letters[0].getBoundingClientRect(); // force reflow
    letters.forEach(l => {
      const r = l.getBoundingClientRect();
      l.style.width = r.width + 'px';
    });
    title.style.height = title.getBoundingClientRect().height + 'px';
    hadInfected.forEach(l => l.classList.add('infected'));
  }
  lockLayout();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockLayout, 150);
  });

  const shuffle = (arr) => {
    const a = arr.slice();
    for(let i=a.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  };
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  async function cycle(){
    while(true){
      await wait(9000 + Math.random()*6000);
      const order = shuffle(letters);
      // Force "patient zero" (index 0) to be a letter from "A WIRED".
      // Step-based scheduling below keeps index 0 as the first to fire,
      // so swapping a seed letter into order[0] guarantees the infection
      // always starts in the first two words — never in "SPINE".
      if(seedLetters.length){
        const seed = seedLetters[Math.floor(Math.random()*seedLetters.length)];
        const idx = order.indexOf(seed);
        if(idx > 0){ [order[0], order[idx]] = [order[idx], order[0]]; }
      }
      const spread = 5500;
      const step = spread / order.length;
      // Signal the spread phase to CSS so the logo above can react.
      inner.classList.add('infecting');
      // Each letter infection guarantees a direction flip on the ring,
      // so the two red "electron" dots visibly reverse on every single
      // letter. We toggle from the current state (tracked locally) —
      // a pure random pick would keep the same direction ~half the time.
      let ringDir = 'reverse';
      for(let i=0; i<order.length; i++){
        setTimeout(() => {
          order[i].classList.add('infected');
          if(ring){
            ringDir = (ringDir === 'normal') ? 'reverse' : 'normal';
            ring.style.animationDirection = ringDir;
          }
        }, i*step + Math.random()*step*0.5);
      }
      await wait(spread + 1100);
      title.classList.add('overload');
      inner.classList.add('overloading');
      await wait(180);
      letters.forEach(l => l.classList.remove('infected'));
      await wait(140);
      title.classList.remove('overload');
      inner.classList.remove('overloading');
      inner.classList.remove('infecting');
      // Hand the ring back to its CSS-default reverse spin.
      if(ring) ring.style.animationDirection = '';
    }
  }
  cycle();
})();

// Crosshair follows cursor
const ch = document.querySelector('.crosshair');
if (ch){
  const h = ch.querySelector('.crosshair__h');
  const v = ch.querySelector('.crosshair__v');
  window.addEventListener('pointermove', (e) => {
    h.style.top = e.clientY + 'px';
    v.style.left = e.clientX + 'px';
  });
}

// Render synthetic waveform strips for field recordings
document.querySelectorAll('.field__wave').forEach((el, idx) => {
  const seed = parseInt(el.dataset.seed || (idx+1), 10);
  // Deterministic pseudo-random from seed
  function rand(n){ const x = Math.sin(seed * 9301 + n * 49297) * 233280; return x - Math.floor(x); }
  const N = 80;
  // Build a polygon mask so the bar heights vary
  const pts = [];
  for (let i = 0; i < N; i++){
    const base = 0.35 + 0.55 * rand(i);
    const burst = rand(i*3) > 0.85 ? 0.25 : 0;
    const h = Math.min(0.98, base + burst);
    pts.push({x: (i/(N-1))*100, h});
  }
  // top polyline then mirrored bottom
  let top = '';
  let bot = '';
  pts.forEach((p,i) => {
    top += `${p.x}% ${50 - p.h*50}%, `;
  });
  for (let i = pts.length-1; i >= 0; i--){
    const p = pts[i];
    bot += `${p.x}% ${50 + p.h*50}%, `;
  }
  const polygon = `polygon(${top}${bot.slice(0,-2)})`;
  el.style.setProperty('--wave-mask', 'none');
  el.style.webkitClipPath = polygon;
  el.style.clipPath = polygon;
});

// ==== nocturne typewriter (interstitial between Etymology and Signal) ====
// For each sentence:
//   1. Type character by character, each char scrambling through random
//      glyphs (acid red) before locking to the real char (white).
//   2. During typing, a small chance of mid-sentence corruption (a █▓▒░
//      block flashes in a random already-typed position, then snaps back).
//   3. Hold the full sentence, with one RGB-split interference flash.
//   4. Erase, then burst TV static across the band, then move on.
// Loops forever. Respects prefers-reduced-motion.
(function initNocturne(){
  const host = document.querySelector('.nocturne[data-lines]');
  if (!host) return;
  const out = host.querySelector('.nocturne__str');
  if (!out) return;

  const raw = (host.getAttribute('data-lines') || '').split('|')
    .map(s => s.trim()).filter(Boolean);
  if (!raw.length) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches){
    out.textContent = raw.join('  ·  ');
    const caret = host.querySelector('.nocturne__caret');
    if (caret) caret.style.display = 'none';
    return;
  }

  const HOLD_MS  = 2000;
  const ERASE_MS = 25;
  const GAP_MS   = 400;
  const GLYPHS   = '█▓▒░!@#$%&*/\\|<>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const BLOCKS   = '█▓▒░';
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const rand = (n) => Math.floor(Math.random() * n);

  // Render `prefix` as a text node followed by `scrambleChar` as a red span.
  // Rebuilds the element to avoid fragile innerHTML escaping.
  function paintScramble(prefix, ch){
    out.textContent = '';
    out.appendChild(document.createTextNode(prefix));
    const span = document.createElement('span');
    span.className = 'nocturne__scramble';
    span.textContent = ch;
    out.appendChild(span);
  }

  let i = 0;

  (async function loop(){
    // eslint-disable-next-line no-constant-condition
    while (true){
      const s = raw[i];

      for (let c = 1; c <= s.length; c++){
        const prefix = s.slice(0, c - 1);
        const real = s.charAt(c - 1);

        if (real === ' '){
          out.textContent = prefix + ' ';
          await sleep(40);
          continue;
        }

        // Scramble frames (random red glyph) → lock to real char (white).
        for (let k = 0; k < 4; k++){
          paintScramble(prefix, GLYPHS.charAt(rand(GLYPHS.length)));
          await sleep(38);
        }
        out.textContent = prefix + real;

        // ~5% chance of a mid-sentence corruption flash on an already-typed
        // position, snapping back after ~100 ms.
        if (c > 3 && Math.random() < 0.05){
          const current = prefix + real;
          const idx = rand(c);
          out.textContent =
            current.slice(0, idx) + BLOCKS.charAt(rand(BLOCKS.length)) + current.slice(idx + 1);
          await sleep(100);
          out.textContent = current;
        }

        await sleep(20);
      }

      // Hold, with a brief RGB-split interference flash partway through.
      await sleep(700);
      host.classList.add('nocturne--glitching');
      await sleep(110);
      host.classList.remove('nocturne--glitching');
      await sleep(HOLD_MS - 700 - 110);

      // Erase — pan the grain right-to-left while we erase chars from the end.
      host.classList.add('nocturne--erasing');
      for (let c = s.length - 1; c >= 0; c--){
        out.textContent = s.slice(0, c);
        await sleep(ERASE_MS);
      }
      host.classList.remove('nocturne--erasing');

      await sleep(GAP_MS);
      i = (i + 1) % raw.length;
    }
  })();
})();
