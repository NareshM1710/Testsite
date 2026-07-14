/* ============================================================
   COURSES — edit your programs here.
   Add / remove / reorder items freely. Save the file and refresh
   the browser. Every field is used on courses.html (and the first
   4 also feed the "Featured" grid on the home page).

   Fields:
     icon  – a small symbol shown in the badge (any character/emoji)
     cat   – category, also used by the filter buttons
             (Foundations · Data · Core AI · Projects · Modern AI)
     title – course name
     meta  – level · duration  (e.g. "Beginner · 6 weeks")
     price – any text ("Free", "₹4,999", "$199" …)
     desc  – one-line description
   ============================================================ */
window.AIKRA = window.AIKRA || {};
window.AIKRA.courses = [
  { icon: '◈', cat: 'Foundations', title: 'AI Fundamentals',    meta: 'Beginner · 6 weeks',     price: 'Free',    desc: 'Understand what AI truly is — core concepts to real applications — with zero prerequisites.' },
  { icon: '▲', cat: 'Foundations', title: 'Python for AI',      meta: 'Beginner · 8 weeks',     price: '₹4,999',  desc: 'Python the AI way — NumPy, Pandas and the tools every AI engineer uses daily.' },
  { icon: '▦', cat: 'Data',        title: 'Data Science',       meta: 'Intermediate · 10 weeks', price: '₹9,499',  desc: 'Turn raw data into insight — statistics, visualization and data storytelling.' },
  { icon: '◆', cat: 'Core AI',     title: 'Machine Learning',   meta: 'Intermediate · 10 weeks', price: '₹9,999',  desc: 'Build models that learn — regression, classification and the full ML workflow.' },
  { icon: '◉', cat: 'Core AI',     title: 'Deep Learning',      meta: 'Advanced · 12 weeks',    price: '₹12,999', desc: 'Master neural nets — CNNs, RNNs and transformers that see, read and reason.' },
  { icon: '⬢', cat: 'Projects',    title: 'AI Projects Studio', meta: 'Advanced · 6 weeks',     price: '₹7,999',  desc: 'Build a portfolio that gets you hired — real, end-to-end mentored AI systems.' },
  { icon: '✦', cat: 'Modern AI',   title: 'Generative AI',      meta: 'Intermediate · 8 weeks', price: '₹11,999', desc: 'Create with AI — apps powered by LLMs, diffusion models and generative techniques.' },
  { icon: '✧', cat: 'Modern AI',   title: 'Prompt Engineering', meta: 'Beginner · 4 weeks',     price: '₹3,999',  desc: 'Master talking to AI — prompts that produce precise, powerful, reliable results.' },
];
