// ============================================================
//  AIKRA AI Institute — futuristic interactions (no build)
//  Starfield canvas · scroll reveal · counters · tilt ·
//  magnetic buttons · carousel · rotating words · cursor glow
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Shared scroll scheduler ----------
     All scroll-driven work runs once per frame via a single rAF loop. */
  const scrollJobs = [];
  let scrollTicking = false;
  const runScrollJobs = () => { for (let i = 0; i < scrollJobs.length; i++) scrollJobs[i](); scrollTicking = false; };
  const onScrollGlobal = () => { if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(runScrollJobs); } };
  const addScrollJob = (fn) => { scrollJobs.push(fn); fn(); };
  window.addEventListener('scroll', onScrollGlobal, { passive: true });
  window.addEventListener('resize', onScrollGlobal, { passive: true });

  /* Pause heavy rAF animations when the tab is hidden */
  let pageVisible = !document.hidden;
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });

  /* ---------- Animated starfield / particle network ---------- */
  const canvas = document.getElementById('starfield');
  if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, particles, mouse = { x: -999, y: -999 };
    const COUNT = Math.min(window.innerWidth < 768 ? 40 : 70, Math.floor(window.innerWidth / 22));
    const LINK_DIST_SQ = 120 * 120, MOUSE_DIST_SQ = 150 * 150;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const make = () => Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
      c: ['#34e0f0', '#7c8bff', '#b57bff', '#ff7eb6'][Math.floor(Math.random() * 4)]
    }));
    resize(); particles = make();
    window.addEventListener('resize', () => { resize(); particles = make(); });
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    const draw = () => {
      if (!pageVisible) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.globalAlpha = 0.8; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.c; ctx.globalAlpha = (1 - d2 / LINK_DIST_SQ) * 0.16;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        const dmx = a.x - mouse.x, dmy = a.y - mouse.y;
        const dm2 = dmx * dmx + dmy * dmy;
        if (dm2 < MOUSE_DIST_SQ) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#7c8bff'; ctx.globalAlpha = (1 - dm2 / MOUSE_DIST_SQ) * 0.3;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    draw();
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cursor spotlight (follows the mouse) ---------- */
  const spotlight = document.getElementById('spotlight');
  if (spotlight && !matchMedia('(pointer: coarse)').matches && !reduceMotion) {
    let sx = window.innerWidth / 2, sy = window.innerHeight / 2, tx = sx, ty = sy;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const follow = () => {
      if (pageVisible) {
        sx += (tx - sx) * 0.12; sy += (ty - sy) * 0.12;
        spotlight.style.transform = `translate(${sx}px, ${sy}px)`;
      }
      requestAnimationFrame(follow);
    };
    follow();
  }

  /* ---------- Floating "fly-around" shapes ---------- */
  const floaties = document.getElementById('floaties');
  if (floaties && !reduceMotion) {
    const kinds = ['', 'ring', 'tri'];
    const count = window.innerWidth < 768 ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      el.className = 'floatie' + (kind ? ' ' + kind : '');
      const size = kind === 'tri' ? 0 : Math.random() * 10 + 4;
      if (kind !== 'tri') { el.style.width = size + 'px'; el.style.height = size + 'px'; }
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = Math.random() * 100 + 'vh';
      el.style.animationDuration = (Math.random() * 20 + 16) + 's';
      el.style.animationDelay = (-Math.random() * 20) + 's';
      floaties.appendChild(el);
    }
  }

  /* ---------- Scroll parallax on [data-parallax] ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    const onParallax = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        el.style.transform = `translateY(${y * speed}px)`;
      });
    };
    onParallax();
    window.addEventListener('scroll', onParallax, { passive: true });
  }
  const header = document.querySelector('.site-header');
  if (header) addScrollJob(() => header.classList.toggle('scrolled', window.scrollY > 20));

  /* ---------- Nav highlighting (current page + scrollspy) ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link, .m-link'));
  if (navLinks.length) {
    const currentPage = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
    // parse each link into { el, page, hash }
    const parsed = navLinks.map((el) => {
      const raw = el.getAttribute('href') || '';
      const [page, hash] = raw.split('#');
      const pg = (page.split('/').pop() || 'index.html') || 'index.html';
      return { el, page: pg, hash: hash || '' };
    });
    const clearActive = () => parsed.forEach((p) => p.el.classList.remove('is-active'));

    // 1) Highlight the link for the current page that has NO hash (e.g. About, Courses, Contact)
    const setPageActive = () => {
      const match = parsed.find((p) => p.page === currentPage && !p.hash);
      match && match.el.classList.add('is-active');
    };

    // 2) On pages that own hash-sections, scrollspy between them
    const spyLinks = parsed.filter((p) => p.hash && p.page === currentPage);
    const sections = spyLinks
      .map((p) => ({ p, sec: document.getElementById(p.hash) }))
      .filter((x) => x.sec)
      .sort((a, b) => (a.sec.compareDocumentPosition(b.sec) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);

    if (sections.length) {
      const spy = () => {
        // Measure live: with content-visibility, cached offsets go stale, and
        // there are only a few sections so getBoundingClientRect is cheap here.
        const line = window.innerHeight * 0.35;
        let current = null;
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].sec.getBoundingClientRect().top <= line) current = sections[i];
        }
        clearActive();
        if (current) {
          parsed.forEach((p) => { if (p.hash === current.p.hash && p.page === currentPage) p.el.classList.add('is-active'); });
        } else {
          setPageActive();
        }
      };
      addScrollJob(spy);
    } else {
      setPageActive();
    }
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const openMenu = () => { menu && menu.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { menu && menu.classList.add('hidden'); document.body.style.overflow = ''; };
  toggle && toggle.addEventListener('click', openMenu);
  menu && menu.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeMenu));
  menu && menu.querySelectorAll('a').forEach((el) => el.addEventListener('click', closeMenu));
  // Close mobile menu with the Escape key
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu && !menu.classList.contains('hidden')) closeMenu(); });

  /* ---------- Scroll reveal (all variants + stagger) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale, [data-stagger]').forEach((el) => io.observe(el));

  /* ---------- Top scroll-progress bar ---------- */
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    const onProg = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      progress.style.transform = `scaleX(${Math.min(p, 1)})`;
    };
    addScrollJob(onProg);
  }

  /* ---------- Animated counters ---------- */
  const animateCounter = (el) => {
    const target = Number(el.dataset.target), suffix = el.dataset.suffix || '';
    const start = performance.now(), dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  // Only plain counters here; counters that also have [data-ring] are handled by the ring observer below
  document.querySelectorAll('[data-counter]:not([data-ring])').forEach((el) => cio.observe(el));

  /* ---------- Hero rotating words ---------- */
  const rotator = document.querySelector('[data-rotator]');
  if (rotator) {
    const words = (rotator.dataset.words || '').split(',');
    let i = 0;
    rotator.style.transition = 'opacity .3s ease, transform .3s ease';
    rotator.style.display = 'inline-block';
    setInterval(() => {
      i = (i + 1) % words.length;
      rotator.style.opacity = '0'; rotator.style.transform = 'translateY(10px)';
      setTimeout(() => { rotator.textContent = words[i]; rotator.style.opacity = '1'; rotator.style.transform = 'translateY(0)'; }, 300);
    }, 2600);
  }

  /* ---------- 3D tilt on cards (with moving glare) ---------- */
  if (!matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.style.transformStyle = 'preserve-3d';
      // inject a glare layer
      const glare = document.createElement('span');
      glare.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(circle at 50% 0%, rgba(255,255,255,.18), transparent 55%);';
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.appendChild(glare);
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-8px)`;
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,.22), transparent 55%)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; glare.style.opacity = '0'; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Testimonial carousel ---------- */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-track]');
    if (!track) return;
    const slides = track.children.length;
    let index = 0;
    const perView = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    const max = () => Math.max(0, slides - perView());

    // Dot indicators
    const dotWrap = document.createElement('div');
    dotWrap.className = 'carousel-dots';
    root.appendChild(dotWrap);
    const rebuildDots = () => {
      dotWrap.innerHTML = '';
      const count = max() + 1;
      for (let i = 0; i < count; i++) {
        const b = document.createElement('button');
        b.className = 'carousel-dot' + (i === index ? ' is-active' : '');
        b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        b.addEventListener('click', () => { index = i; update(); });
        dotWrap.appendChild(b);
      }
    };
    const update = () => {
      track.style.transform = `translateX(-${index * (100 / perView())}%)`;
      dotWrap.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('is-active', i === index));
    };
    const next = () => { index = index >= max() ? 0 : index + 1; update(); };
    const prev = () => { index = index <= 0 ? max() : index - 1; update(); };
    root.querySelector('[data-next]') && root.querySelector('[data-next]').addEventListener('click', next);
    root.querySelector('[data-prev]') && root.querySelector('[data-prev]').addEventListener('click', prev);

    // Touch swipe
    let sx = 0, dx = 0;
    track.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; dx = 0; }, { passive: true });
    track.addEventListener('touchmove', (e) => { dx = e.touches[0].clientX - sx; }, { passive: true });
    track.addEventListener('touchend', () => { if (Math.abs(dx) > 40) (dx < 0 ? next : prev)(); });

    rebuildDots();
    let timer = setInterval(next, 5000);
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => { timer = setInterval(next, 5000); });
    window.addEventListener('resize', () => { rebuildDots(); update(); });
  });

  /* ---------- Course search + filter ---------- */
  const search = document.getElementById('course-search');
  const filterWrap = document.getElementById('course-filters');
  const items = Array.from(document.querySelectorAll('.course-item'));
  const noResults = document.getElementById('no-results');
  const resultCount = document.getElementById('result-count');
  if (items.length) {
    let active = 'All';
    const apply = () => {
      const q = (search && search.value || '').toLowerCase().trim();
      let visible = 0;
      items.forEach((item) => {
        const matchCat = active === 'All' || item.dataset.category === active;
        const matchQ = !q || (item.dataset.title || '').includes(q) || (item.dataset.category || '').toLowerCase().includes(q);
        const show = matchCat && matchQ;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      noResults && noResults.classList.toggle('hidden', visible > 0);
      if (resultCount) resultCount.textContent = visible + (visible === 1 ? ' program' : ' programs');
    };
    search && search.addEventListener('input', apply);
    filterWrap && filterWrap.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        active = btn.dataset.filter || 'All';
        filterWrap.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active'); apply();
      });
    });
    apply(); // initialise count
  }

  /* ---------- Demo forms (with loading + success state) ---------- */
  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('button[type="submit"]');
      const msg = form.querySelector('[data-success]');
      const original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.style.opacity = '.7'; btn.style.cursor = 'wait'; btn.innerHTML = 'Sending…'; }
      // Simulate a network request
      setTimeout(() => {
        form.reset();
        if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.style.cursor = ''; btn.innerHTML = original; }
        msg && msg.classList.remove('hidden');
        msg && msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // auto-hide after a while
        setTimeout(() => msg && msg.classList.add('hidden'), 6000);
      }, 900);
    });
  });

  /* ---------- Prevent dead "#" links from jumping to top ---------- */
  document.querySelectorAll('a[href="#"]').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  /* ---------- FAQ single-open accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-wrap details');
  faqItems.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) faqItems.forEach((other) => { if (other !== d) other.open = false; });
    });
  });

  /* ---------- Back-to-top button ---------- */
  const toTop = document.getElementById('to-top');
  if (toTop) {
    const toggleTop = () => toTop.classList.toggle('is-visible', window.scrollY > 500);
    addScrollJob(toggleTop);
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Button click ripple ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  /* ============================================================
     SCROLL-HOOK FEATURES — keep users scrolling to the bottom
     ============================================================ */
  const noMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Typewriter hero subtitle ---------- */
  const heroP = document.querySelector('[data-typewriter]');
  if (heroP && !noMotion) {
    const full = heroP.dataset.typewriter;
    heroP.textContent = '';
    heroP.classList.add('typewriter');
    let ci = 0;
    const type = () => {
      if (ci < full.length) { heroP.textContent += full[ci]; ci++; setTimeout(type, 32); }
      else { heroP.classList.remove('typewriter'); }
    };
    setTimeout(type, 1200);
  }

  /* ---------- 2. Trust bar — auto-scroll horizontal ---------- */
  const trustTrack = document.getElementById('trust-track');
  if (trustTrack && !noMotion) {
    let tOff = 0, half = trustTrack.scrollWidth / 2;
    window.addEventListener('resize', () => { half = trustTrack.scrollWidth / 2; });
    const scrollTrust = () => {
      if (pageVisible) {
        tOff -= 0.5;
        if (Math.abs(tOff) >= half) tOff = 0;
        trustTrack.style.transform = `translate3d(${tOff}px,0,0)`;
      }
      requestAnimationFrame(scrollTrust);
    };
    scrollTrust();
  }

  /* ---------- 3. Circular progress rings on stat counters ---------- */
  const animateCounter2 = (el) => {
    const target = Number(el.dataset.target), suffix = el.dataset.suffix || '';
    const ringPct = Number(el.dataset.ring) || 0;
    const ring = el.closest('.stat-box')?.querySelector('.stat-ring');
    const start = performance.now(), dur = 2000;
    if (ring) {
      const circumference = 2 * Math.PI * 45; // r=45
      const fillTo = circumference - (ringPct / 100) * circumference;
      ring.querySelector('.ring-fill').style.setProperty('--fill', fillTo);
      ring.classList.add('is-filled');
    }
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  };
  // Override counter observer to use the ring version
  const cio2 = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCounter2(e.target); cio2.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-ring]').forEach((el) => cio2.observe(el));

  /* ---------- 4. Word-by-word text reveal (Apple-style) ---------- */
  const wrEl = document.getElementById('word-reveal');
  if (wrEl && !noMotion) {
    const text = wrEl.textContent.trim();
    wrEl.innerHTML = text.split(/\s+/).map((w) => `<span class="wr-word">${w}</span>`).join(' ');
    const words = wrEl.querySelectorAll('.wr-word');
    let wrActive = false;
    new IntersectionObserver((e) => { wrActive = e[0].isIntersecting; }, { rootMargin: '20% 0px' }).observe(wrEl);
    const onWordScroll = () => {
      if (!wrActive) return;
      const rect = wrEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - Math.max(0, Math.min(1, (rect.top - vh * 0.2) / (vh * 0.6)));
      const litCount = Math.floor(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < litCount));
    };
    addScrollJob(onWordScroll);
  }

  /* ---------- 5. Hero parallax depth layers ---------- */
  const heroSection = document.querySelector('[data-hero-parallax]');
  if (heroSection && !noMotion) {
    const layers = heroSection.querySelectorAll('[data-speed]');
    let heroActive = true;
    new IntersectionObserver((e) => { heroActive = e[0].isIntersecting; }).observe(heroSection);
    const onHeroParallax = () => {
      if (!heroActive) return;
      const y = window.scrollY;
      layers.forEach((l) => {
        const speed = parseFloat(l.dataset.speed) || 0;
        l.style.transform = `translateY(${y * speed}px)`;
      });
    };
    addScrollJob(onHeroParallax);
  }

  /* ---------- 6. Learning path connector fill animation ---------- */
  document.querySelectorAll('.path-steps').forEach((list) => {
    // Inject connector line
    const conn = document.createElement('div');
    conn.className = 'path-connector';
    conn.innerHTML = '<div class="fill"></div>';
    list.prepend(conn);
    const connIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { conn.classList.add('is-filled'); connIO.unobserve(e.target); } });
    }, { threshold: 0.3 });
    connIO.observe(list);
  });

  /* ---------- 7. Side CTA with countdown + urgency ---------- */
  const sideCta = document.getElementById('side-cta');
  const sideClose = document.getElementById('side-cta-close');
  if (sideCta) {
    let dismissed = false;
    // Show after user scrolls 40% of page
    const toggleSide = () => {
      if (dismissed) return;
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      sideCta.classList.toggle('is-visible', pct > 0.35);
    };
    addScrollJob(toggleSide);
    sideClose && sideClose.addEventListener('click', () => { dismissed = true; sideCta.classList.remove('is-visible'); });

    // Countdown to "next batch" — 7 days from now
    const target = new Date(); target.setDate(target.getDate() + 7);
    const cdD = document.getElementById('cd-d'), cdH = document.getElementById('cd-h'),
          cdM = document.getElementById('cd-m'), cdS = document.getElementById('cd-s');
    if (cdD) {
      const tickCD = () => {
        const diff = Math.max(0, target - Date.now());
        const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000),
              m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
        cdD.textContent = String(d).padStart(2, '0');
        cdH.textContent = String(h).padStart(2, '0');
        cdM.textContent = String(m).padStart(2, '0');
        cdS.textContent = String(s).padStart(2, '0');
      };
      tickCD(); setInterval(tickCD, 1000);
    }
  }

  /* ---------- 8. Hero "prompt → response" AI demo ---------- */
  const aiDemo = document.querySelector('[data-ai-demo]');
  if (aiDemo) {
    const promptEl = aiDemo.querySelector('#ai-prompt');
    const respRow = aiDemo.querySelector('#ai-response-row');
    const respEl = aiDemo.querySelector('#ai-response');
    const convos = [
      { q: 'What will I learn at AIKRA?', a: 'Everything from ML foundations to production GenAI — building real, deployed systems mentored by practitioners.' },
      { q: 'Do I need a coding background?', a: 'Not at all. Our beginner track starts from first principles and takes you to job-ready in months.' },
      { q: 'What career can I build?', a: 'ML Engineer, Data Scientist, GenAI Specialist — 95% of our learners launch AI careers within a year.' },
    ];
    const typeText = (el, text, speed) => new Promise((res) => {
      el.textContent = ''; let i = 0;
      const t = () => { if (i < text.length) { el.textContent += text[i++]; setTimeout(t, speed); } else res(); };
      t();
    });
    let ci = 0, started = false;
    const runConvo = async () => {
      const { q, a } = convos[ci % convos.length];
      respRow.style.display = 'none'; respEl.textContent = '';
      promptEl.classList.add('ai-caret');
      await typeText(promptEl, q, 34);
      promptEl.classList.remove('ai-caret');
      await new Promise((r) => setTimeout(r, 350));
      respRow.style.display = 'flex';
      respEl.innerHTML = '<span class="ai-typing"><span></span><span></span><span></span></span>';
      await new Promise((r) => setTimeout(r, 900));
      respEl.classList.add('ai-caret');
      await typeText(respEl, a, 20);
      respEl.classList.remove('ai-caret');
      ci++;
      setTimeout(runConvo, 2600);
    };
    // Start only when the widget scrolls into view
    new IntersectionObserver((e, obs) => {
      if (e[0].isIntersecting && !started) { started = true; runConvo(); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(aiDemo);
  }

  /* ---------- 9. Curriculum skill-tree reveal ---------- */
  document.querySelectorAll('[data-skilltree]').forEach((tree) => {
    new IntersectionObserver((e, obs) => {
      if (e[0].isIntersecting) { tree.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.2 }).observe(tree);
  });
});
