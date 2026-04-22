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
