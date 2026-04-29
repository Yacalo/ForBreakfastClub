// For Breakfast — Editorial site interactions

// ---------- YouTube videos ----------
const VIDEOS = [
  { id: 'pDByC9V9l6Q', title: 'Is the West losing the AI race?', ep: '01', cat: 'KEYNOTE' },
  { id: '1uR1O9H_7F8', title: 'Filmmaking After AI: Calvin Herbst on Cameras, Code, and Creative Control', ep: '02', cat: 'FILM' },
  { id: 'QKxfpaakzLY', title: 'Mastering AI Before It Masters You — Eric Stoddard, Car Design Legend Tells All', ep: '03', cat: 'DESIGN' },
  { id: 'Yy4vYd8y_q8', title: 'What AI Really Changes in UX Design NOW', ep: '04', cat: 'UX' },
  { id: 'wXvO3pL9Q_I', title: 'How AI Helps Small Businesses Win', ep: '05', cat: 'BUSINESS' },
  { id: '8m9g_qR8h-o', title: 'The AI That Actually Gets Work Done', ep: '06', cat: 'PRODUCT' },
  { id: 'Z_k8vS4wN6Y', title: 'Music Executive Jeremy Da: How To Compete With AI Music And Build Fan Power', ep: '07', cat: 'MUSIC' },
  { id: 'vV2NnJ_v8Q0', title: 'Will Hoomanz always make better games?', ep: '08', cat: 'GAMES' },
];

function thumbSrc(id) { return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
function thumbHiRes(id) { return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`; }

function renderVideos() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;
  grid.innerHTML = VIDEOS.map((v, i) => `
    <article class="video-card" data-i="${i}" data-id="${v.id}">
      <div class="num-row"><span>${v.ep}</span><span>${v.cat}</span></div>
      <div class="v-title">${v.title}</div>
      <div class="thumb-wrap" role="button" tabindex="0" aria-label="Play: ${v.title}">
        <img class="thumb" src="${thumbSrc(v.id)}" data-hires="${thumbHiRes(v.id)}" alt="" loading="lazy" />
        <div class="play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="v-foot">
        <a class="v-link" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open on YouTube ↗</a>
      </div>
    </article>`).join('');

  // Hi-res thumb upgrade
  grid.querySelectorAll('img.thumb').forEach(img => {
    const hi = img.dataset.hires;
    if (!hi) return;
    const probe = new Image();
    probe.onload = () => { if (probe.naturalWidth > 120) img.src = hi; };
    probe.src = hi;
  });

  // Click-to-play in place
  grid.querySelectorAll('.thumb-wrap').forEach(wrap => {
    const play = () => {
      const card = wrap.closest('.video-card');
      const id = card.dataset.id;
      if (wrap.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = 'YouTube video player';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.frameBorder = '0';
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.classList.add('playing');
    };
    wrap.addEventListener('click', play);
    wrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });
}
renderVideos();

// ---------- Testimonials carousel ----------
const TESTIMONIALS = [
  {
    name: 'Nick King',
    quote: 'Cisco wanted an experience that would stop busy conference attendees in their tracks. The project produced 9× the foot traffic year on year and 5M+ impressions on social media.',
    who: 'Vice President · Cisco CX'
  },
  {
    name: 'Sam Martin',
    quote: 'Yann is certainly in the top 5% of digital creative directors worldwide.',
    who: 'Managing Director · World Forum Disrupt · London'
  },
  {
    name: 'James White',
    quote: 'Creative excellence fused with future vision is always an explosive combination… Yann has both, and exercises them beautifully depending on the brief and situation.',
    who: 'Head of Studios · Design Lab · Former Chief Programs Officer · WDC 2024'
  },
  {
    name: 'Sophie Daranyi',
    quote: 'Yann was a fantastic member of our team — creative, energetic and determined, and great fun to work with.',
    who: 'Chairperson · NED · Advisor · Investor · Former Omnicom'
  },
  {
    name: 'Jean Schiltz',
    quote: 'Yann has provided me with strong support in terms of both initial creative content and ongoing project development.',
    who: "Director, Smart Mobility · Ministère de l'Économie · Luxembourg"
  },
  {
    name: 'Tom Charles',
    quote: 'Yann is a rare breed. His work is cutting edge, no task is too great. In fact he thrives on finding solutions to difficult problems.',
    who: 'Carbon Interventionist & Managing Director · SKU-Driver'
  },
  {
    name: 'Destin Young',
    quote: 'Yann is one of the most brilliant Innovators I have ever had the distinct pleasure of working with. His Leadership discipline is a unique and effortless combination of Innovation, Strategy, and Creative, with a Purpose-driven mindset.',
    who: 'CXO · MIT · PhD · Startup Advisor · AI/ML'
  }
];
let tIndex = 0;
function renderT() {
  const stage = document.getElementById('t-stage');
  if (!stage) return;
  const t = TESTIMONIALS[tIndex];
  stage.innerHTML = `
    <div class="testimonial-stage">
      <div class="testimonial-name">${t.name}</div>
      <div>
        <blockquote class="testimonial-quote">"${t.quote}"</blockquote>
        <div style="margin-top:40px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.75">
          ${t.who}
        </div>
      </div>
    </div>`;
  const count = document.getElementById('t-count');
  if (count) count.textContent = `0${tIndex+1} / 0${TESTIMONIALS.length}`;
}
renderT();
document.getElementById('t-prev')?.addEventListener('click', () => {
  tIndex = (tIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  renderT();
});
document.getElementById('t-next')?.addEventListener('click', () => {
  tIndex = (tIndex + 1) % TESTIMONIALS.length;
  renderT();
});

// ---------- Portrait stack carousel ----------
const STACK = [
  { src: 'assets/event-sxsw.jpg', cap: 'SXSW · Austin' },
  { src: 'assets/event-nyc-summit.jpg', cap: 'NYC Summit · New York' },
  { src: 'assets/event-sf.jpg', cap: 'Talk · San Francisco' },
  { src: 'assets/event-lv-exawards.jpg', cap: 'Ex Awards · Las Vegas' },
  { src: 'assets/event-la-facc.jpg', cap: 'FACC Media · Los Angeles' },
  { src: 'assets/event-infinity-fest.jpg', cap: 'Infinity Fest' },
  { src: 'assets/event-trinet.jpg', cap: 'TriNet' },
];
let stackIdx = 0;
function renderStack() {
  const el = document.getElementById('portrait-stack');
  if (!el) return;
  const N = STACK.length;
  el.innerHTML = STACK.map((c, i) => {
    const pos = (i - stackIdx + N) % N;
    return `<div class="card" data-pos="${pos}" data-i="${i}">
      <img src="${c.src}" alt="" loading="lazy" referrerpolicy="no-referrer" />
      <div class="cap"><span>${String(pos+1).padStart(2,'0')}/${String(N).padStart(2,'0')}</span><span>${c.cap}</span></div>
    </div>`;
  }).join('');
  el.querySelectorAll('.card').forEach(card => {
    if (card.dataset.pos === '0') card.classList.add('active');
    card.addEventListener('click', () => {
      const i = +card.dataset.i;
      if (i === stackIdx) advance(1); else { stackIdx = i; renderStack(); }
    });
  });
  const idx = document.getElementById('carousel-index');
  const lbl = document.getElementById('carousel-label');
  if (idx) idx.textContent = `${String(stackIdx+1).padStart(2,'0')} / ${String(N).padStart(2,'0')}`;
  if (lbl) lbl.textContent = STACK[stackIdx].cap;
}
function advance(dir) {
  stackIdx = (stackIdx + dir + STACK.length) % STACK.length;
  renderStack();
}
renderStack();
document.getElementById('car-prev')?.addEventListener('click', () => advance(-1));
document.getElementById('car-next')?.addEventListener('click', () => advance(1));
// auto rotate every 5s while visible
let autoTimer = null;
const stackObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (!autoTimer) autoTimer = setInterval(() => advance(1), 5000);
    } else {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
  });
}, { threshold: 0.3 });
const stackEl = document.getElementById('portrait-stack');
if (stackEl) stackObs.observe(stackEl);

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('open'));
});

// ---------- Menu overlay ----------
const menuPanel = document.getElementById('menu-panel');
document.getElementById('menu-open')?.addEventListener('click', () => menuPanel?.classList.add('open'));
document.getElementById('menu-close')?.addEventListener('click', () => menuPanel?.classList.remove('open'));
menuPanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuPanel.classList.remove('open')));

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Hero title staggered load ----------
const hero = document.querySelector('.hero');
if (hero) {
  // apply immediately + as safety net after load event
  hero.classList.add('loaded');
  window.addEventListener('load', () => hero.classList.add('loaded'));
}

// ---------- Parallax ----------
const parallaxEls = document.querySelectorAll('.parallax');
function onScroll() {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    const depth = parseFloat(el.dataset.depth || '0.2');
    el.style.transform = `translate3d(0, ${y * depth}px, 0)`;
  });
  // Toggle dark body class for rails colour when in story/cta sections
  const darkSections = document.querySelectorAll('.hero, .story, .clients, .cta-final');
  let onDark = false;
  const mid = y + window.innerHeight / 2;
  darkSections.forEach(s => {
    const r = s.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const bottom = top + r.height;
    if (mid >= top && mid <= bottom) onDark = true;
  });
  document.body.classList.toggle('on-dark', onDark);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Custom cursor ----------
const cursor = document.getElementById('cursor');
if (cursor) {
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let tx = cx, ty = cy;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  function loop() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a, button, .faq-item, .talk-row, .video-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

// ---------- Episode counter ----------
const ep = document.getElementById('ep-counter');
if (ep) ep.textContent = VIDEOS.length + 18;
