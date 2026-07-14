/* ============================================================
   SITE / SEO / CONTACT — global settings + per-page SEO metadata.
   These values are applied automatically to every page's <title>,
   meta description, Open Graph tags, and the footer contact info.

   Edit the text, save, and refresh the browser.
   ============================================================ */
window.AIKRA = window.AIKRA || {};

window.AIKRA.site = {
  /* ---- Brand ---- */
  name: 'AIKRA AI Institute',
  tagline: 'The Institute of AI Science',
  url: 'https://aikra.ai',            // your live domain (used for canonical/OG)

  /* ---- Contact details (shown in footer + contact page) ---- */
  email: 'hello@aikra.ai',
  phone: '+91 98765 43210',
  address: 'AAI Campus, Tech Park, Bengaluru',

  /* ---- Social links (leave '' to hide) ---- */
  social: {
    linkedin: '',
    twitter: '',
    youtube: '',
    instagram: '',
  },

  /* ---- Default SEO (used when a page has no specific entry) ---- */
  defaultSEO: {
    title: 'AIKRA AI Institute — The Institute of AI Science',
    description: 'AIKRA AI Institute (AAI) — a next-era AI institute. Learn Machine Learning, Deep Learning, Generative AI and Data Science from practitioners and build a future-proof AI career.',
    image: 'assets/favicon.svg',
    keywords: 'AI institute, machine learning course, deep learning, generative AI, data science, AI career',
  },
};

/* ---- Per-page SEO overrides ----
   Key = the page's file name. Any field you omit falls back to defaultSEO. */
window.AIKRA.seo = {
  'index.html': {
    title: 'AIKRA AI Institute — Engineer the Intelligence of Tomorrow',
    description: 'Become an elite AI engineer at AIKRA. Project-first programs in ML, Deep Learning, Generative AI and Data Science, taught by practitioners.',
  },
  'courses.html': {
    title: 'AI Programs & Courses — AIKRA AI Institute',
    description: 'Explore AIKRA\'s AI programs — from AI Fundamentals and Python to Machine Learning, Deep Learning, Generative AI and Prompt Engineering.',
    keywords: 'AI courses, machine learning course, generative AI course, prompt engineering, python for AI',
  },
  'about.html': {
    title: 'About AIKRA — The Institute of AI Science',
    description: 'AIKRA turns curious minds into elite AI engineers through rigorous, practical, human-centered education built for the next era.',
  },
  'contact.html': {
    title: 'Contact AIKRA AI Institute',
    description: 'Have a question or ready to enroll? Contact the AIKRA team — we reply within 24 hours.',
  },
};
