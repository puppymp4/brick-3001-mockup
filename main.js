/* Brick 3001 · page behaviour. No dependencies. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header hairline once the page scrolls */
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu: full-screen, focus stays inside, Esc closes */
  const btn = $('.menu-btn');
  const menu = $('#menu');
  if (btn && menu) {
    const label = $('.menu-label', btn);
    const isOpen = () => btn.getAttribute('aria-expanded') === 'true';
    const focusables = () => [btn, ...$$('a', menu)];

    const open = () => {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      btn.setAttribute('aria-expanded', 'true');
      label.textContent = 'Close';
      document.body.style.overflow = 'hidden';
      const first = $('a', menu);
      if (first) first.focus();
    };
    const close = (returnFocus = true) => {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      label.textContent = 'Menu';
      document.body.style.overflow = '';
      window.setTimeout(() => { if (!isOpen()) menu.hidden = true; }, 200);
      if (returnFocus) btn.focus();
    };

    btn.addEventListener('click', () => (isOpen() ? close() : open()));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(false); });
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (e) => { if (e.matches && isOpen()) close(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
  }

  /* Hours: the table is the source of truth. Status is computed in Fresno time,
     so a visitor in another time zone still sees the shop's real state. */
  const rows = $$('#hours-table tr[data-day]');
  if (rows.length) {
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const fmt = (t) => {
      let [h, m] = t.split(':').map(Number);
      const ap = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return m ? `${h}:${String(m).padStart(2, '0')} ${ap}` : `${h} ${ap}`;
    };
    const sched = {};
    rows.forEach((r) => {
      sched[Number(r.dataset.day)] = r.dataset.open ? { open: r.dataset.open, close: r.dataset.close } : null;
    });

    let now;
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      }).formatToParts(new Date());
      const get = (type) => (parts.find((p) => p.type === type) || {}).value;
      now = {
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')),
        min: Number(get('hour')) * 60 + Number(get('minute')),
      };
    } catch (err) {
      now = null;
    }

    if (now && now.day > -1) {
      const today = sched[now.day];
      let state = { open: false, text: '' };
      if (today && now.min >= toMin(today.open) && now.min < toMin(today.close)) {
        state = { open: true, text: `Open now until ${fmt(today.close)}` };
      } else if (today && now.min < toMin(today.open)) {
        state = { open: false, text: `Opens today at ${fmt(today.open)}` };
      } else {
        for (let i = 1; i <= 7; i += 1) {
          const d = (now.day + i) % 7;
          if (sched[d]) {
            state = { open: false, text: `Closed now. Opens ${i === 1 ? 'tomorrow' : DAYS[d]} at ${fmt(sched[d].open)}` };
            break;
          }
        }
      }
      if (state.text) {
        $$('[data-status]').forEach((el) => {
          const t = $('[data-status-text]', el);
          if (t) t.textContent = state.text;
          el.classList.toggle('is-open', state.open);
        });
      }
      rows.forEach((r) => {
        if (Number(r.dataset.day) === now.day) {
          r.classList.add('is-today');
          r.setAttribute('aria-current', 'date');
        }
      });
    }
  }

  /* Why 3001: the logo comes apart into a drawing, once.
     If the drawing is already on screen at load, or motion is reduced, it simply stays drawn. */
  const dwg = $('.dwg');
  if (dwg && !reduceMotion && 'IntersectionObserver' in window) {
    const r = dwg.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    if (!onScreen) {
      dwg.classList.add('no-trans', 'is-assembled');
      dwg.getBoundingClientRect();
      dwg.classList.remove('no-trans');
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dwg.classList.remove('is-assembled');
            io.disconnect();
          }
        });
      }, { threshold: 0.45 });
      io.observe(dwg);
    }
  }

  /* Sponsor credit: count every click through to Rift Media as a
     "Sponsor credit click" event in Vercel Web Analytics. The link opens a
     new tab, so this page stays open long enough to send it. */
  const creditClick = (e) => {
    if (e.type === 'auxclick' && e.button !== 1) return;
    if (typeof window.va !== 'function') return;
    window.va('event', {
      name: 'Sponsor credit click',
      data: { site: 'brick3001', page: window.location.pathname === '/' ? 'home' : 'not-found' },
    });
  };
  $$('[data-sponsor-credit]').forEach((a) => {
    a.addEventListener('click', creditClick);
    a.addEventListener('auxclick', creditClick);
  });

  /* Footer year */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
