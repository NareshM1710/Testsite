// ============================================================
//  Shared backdrop + header + footer — edit once, applies to all
// ============================================================

/* ---------- Apply SEO metadata from content/site.js ---------- */
(function applySEO() {
  const A = window.AIKRA;
  if (!A || !A.site) return;
  const page = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
  const seo = Object.assign({}, A.site.defaultSEO, (A.seo && A.seo[page]) || {});
  const head = document.head;
  const setMeta = (sel, attr, key, val) => {
    if (!val) return;
    let el = head.querySelector(sel);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); head.appendChild(el); }
    el.setAttribute('content', val);
  };
  if (seo.title) document.title = seo.title;
  setMeta('meta[name="description"]', 'name', 'description', seo.description);
  setMeta('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
  setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  if (A.site.url) setMeta('meta[property="og:url"]', 'property', 'og:url', A.site.url + '/' + page);
})();

/* ---------- Inject JSON-LD structured data for Google ---------- */
(function applyStructuredData() {
  const A = window.AIKRA;
  if (!A || !A.site) return;
  const url = A.site.url || '';
  const graph = [{
    '@type': 'EducationalOrganization',
    '@id': url + '/#org',
    name: A.site.name,
    description: (A.site.defaultSEO && A.site.defaultSEO.description) || '',
    url: url,
    email: A.site.email,
    telephone: A.site.phone,
    address: A.site.address,
    sameAs: Object.values(A.site.social || {}).filter(Boolean),
  }];
  // Add Course schema on the courses page
  const page = (location.pathname.split('/').pop() || 'index.html') || 'index.html';
  if (page === 'courses.html' && Array.isArray(A.courses)) {
    A.courses.forEach((c) => graph.push({
      '@type': 'Course',
      name: c.title,
      description: c.desc,
      provider: { '@type': 'EducationalOrganization', name: A.site.name, sameAs: url },
    }));
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(script);
})();

const BACKDROP_HTML = `
<canvas id="starfield"></canvas>
<div class="grid-floor"></div>
<div class="aurora a1"></div>
<div class="aurora a2"></div>
<div class="aurora a3"></div>
<div class="aurora a4"></div>
<div class="floaties" id="floaties"></div>
<div class="spotlight" id="spotlight"></div>`;

const HEADER_HTML = `
<div id="scroll-progress" class="scroll-progress"></div>
<header class="site-header">
  <div class="container-aai">
    <nav class="nav-bar glass" style="margin-top:1rem;display:flex;align-items:center;justify-content:space-between;border-radius:9999px;padding:.6rem 1rem;">
      <a href="index.html" style="display:flex;align-items:center;gap:.6rem;font-family:'Sora';font-weight:700;font-size:1.05rem;color:#fff;">
        <span class="ic-badge" style="height:2.3rem;width:2.3rem;padding:0;background:var(--aurora);border:none;box-shadow:0 0 24px rgba(34,211,238,.5);">
          <svg viewBox="0 0 32 32" style="width:1.4rem;height:1.4rem" fill="none" stroke="#05050f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3 4 27h6l6-13 6 13h6L16 3Z"/><circle cx="16" cy="20" r="2.4" fill="#05050f" stroke="none"/></svg>
        </span>
        AIKRA<span class="gradient-text">&nbsp;AI</span>
      </a>
      <ul style="display:none;align-items:center;gap:.15rem;list-style:none;margin:0;padding:0;" class="desktop-nav">
        <li><a class="nav-link" href="about.html">About</a></li>
        <li><a class="nav-link" href="courses.html">Courses</a></li>
        <li><a class="nav-link" href="index.html#paths">Paths</a></li>
        <li><a class="nav-link" href="index.html#faculty">Faculty</a></li>
        <li><a class="nav-link" href="index.html#stories">Stories</a></li>
        <li><a class="nav-link" href="index.html#blogs">Blogs</a></li>
        <li><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
      <div style="display:flex;align-items:center;gap:.6rem;">
        <a href="contact.html" class="btn btn-primary enroll-cta" data-magnetic>Enroll →</a>
        <button id="menu-toggle" aria-label="Open menu" class="mobile-toggle" style="display:grid;place-items:center;height:2.6rem;width:2.6rem;border-radius:9999px;border:1px solid var(--line-bright);background:rgba(255,255,255,.03);color:#fff;cursor:pointer;">
          <svg style="width:1.25rem;height:1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>
  </div>
  <div id="mobile-menu" class="hidden" style="position:fixed;inset:0;z-index:60;">
    <div data-close style="position:absolute;inset:0;background:rgba(5,5,16,.7);backdrop-filter:blur(8px);"></div>
    <div class="glass" style="position:absolute;right:0;top:0;height:100%;width:85%;max-width:22rem;padding:1.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
        <span style="font-family:'Sora';font-weight:700;color:#fff;">MENU</span>
        <button data-close aria-label="Close" style="display:grid;place-items:center;height:2.6rem;width:2.6rem;border-radius:9999px;border:1px solid var(--line-bright);background:rgba(255,255,255,.03);color:#fff;cursor:pointer;">✕</button>
      </div>
      <a class="m-link" href="about.html">About</a>
      <a class="m-link" href="courses.html">Courses</a>
      <a class="m-link" href="index.html#paths">Learning Paths</a>
      <a class="m-link" href="index.html#faculty">Faculty</a>
      <a class="m-link" href="index.html#stories">Success Stories</a>
      <a class="m-link" href="index.html#blogs">Blogs</a>
      <a class="m-link" href="contact.html">Contact</a>
      <a href="contact.html" class="btn btn-primary" style="width:100%;margin-top:1.5rem;">Enroll Now →</a>
    </div>
  </div>
</header>`;

const FOOTER_HTML = `
<footer style="margin-top:6rem;border-top:1px solid var(--line);background:rgba(8,8,20,.6);">
  <div class="container-aai" style="padding:4rem 1.5rem;">
    <div class="footer-grid">
      <div>
        <a href="index.html" style="display:flex;align-items:center;gap:.6rem;font-family:'Sora';font-weight:700;font-size:1.2rem;color:#fff;">
          <span class="ic-badge" style="height:2.3rem;width:2.3rem;padding:0;background:var(--aurora);border:none;">
            <svg viewBox="0 0 32 32" style="width:1.4rem;height:1.4rem" fill="none" stroke="#05050f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3 4 27h6l6-13 6 13h6L16 3Z"/><circle cx="16" cy="20" r="2.4" fill="#05050f" stroke="none"/></svg>
          </span>
          AIKRA<span class="gradient-text">&nbsp;AI</span>
        </a>
        <p style="margin-top:.6rem;font-size:.85rem;color:var(--cyan);font-weight:500;letter-spacing:.05em;">THE INSTITUTE OF AI SCIENCE</p>
        <p style="margin-top:1rem;max-width:24rem;font-size:.9rem;line-height:1.7;color:var(--muted);">Premium AI education engineered for the next era. Learn from practitioners, build real systems, and launch a future-proof AI career.</p>
        <form data-demo-form novalidate style="margin-top:1.4rem;max-width:22rem;">
          <label style="display:block;font-size:.72rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);margin-bottom:.5rem;">Join the signal · newsletter</label>
          <div style="display:flex;gap:.5rem;">
            <input required type="email" name="email" placeholder="you@email.com" class="field" style="flex:1;" />
            <button type="submit" class="btn btn-primary" data-magnetic style="padding:.7rem 1.1rem;white-space:nowrap;">Subscribe</button>
          </div>
          <p data-success class="hidden" style="margin-top:.7rem;font-size:.82rem;font-weight:500;color:var(--mint);">✓ You're subscribed! Watch your inbox.</p>
        </form>
      </div>
      <div class="footer-links">
        <div><h3 class="foot-h">Learn</h3><a class="foot-l" href="courses.html">All Courses</a><a class="foot-l" href="index.html#paths">Learning Paths</a><a class="foot-l" href="#">Certifications</a></div>
        <div><h3 class="foot-h">Institute</h3><a class="foot-l" href="about.html">About AAI</a><a class="foot-l" href="index.html#faculty">Faculty</a><a class="foot-l" href="index.html#stories">Stories</a></div>
        <div><h3 class="foot-h">Resources</h3><a class="foot-l" href="index.html#blogs">Blogs</a><a class="foot-l" href="#">eBooks</a><a class="foot-l" href="#">Webinars</a></div>
        <div><h3 class="foot-h">Company</h3><a class="foot-l" href="contact.html">Contact</a><a class="foot-l" href="#">Privacy</a><a class="foot-l" href="#">Terms</a></div>
      </div>
    </div>
    <div style="margin-top:3rem;border-top:1px solid var(--line);padding-top:2rem;text-align:center;font-size:.85rem;color:var(--dim);">© 2040 AIKRA AI Institute · Engineered for the future.</div>
  </div>
</footer>`;

// Inject backdrop at top of body
document.body.insertAdjacentHTML('afterbegin', BACKDROP_HTML);
const h = document.getElementById('header'); if (h) h.outerHTML = HEADER_HTML;
const f = document.getElementById('footer'); if (f) f.outerHTML = FOOTER_HTML;

// Inject a back-to-top button + auto-add beam dividers between top-level <section> elements
document.body.insertAdjacentHTML('beforeend', '<button class="to-top" id="to-top" aria-label="Back to top">↑</button>');
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main) {
    const sections = Array.from(main.children).filter((n) => n.tagName === 'SECTION');
    sections.forEach((sec, i) => { if (i > 0 && i < sections.length) { const div = document.createElement('div'); div.className = 'beam'; sec.parentNode.insertBefore(div, sec); } });
  }
});
