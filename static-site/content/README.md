# ✏️ Editable Content Folder

This folder holds all the **content you can safely edit** without touching the
website's code. Change the text, **save the file**, and **refresh the browser** —
that's it.

## Files

| File | What it controls | Where it shows |
|------|------------------|----------------|
| `courses.js` | Your programs (title, price, level, description, category) | **Courses** page + the "Featured" grid on the Home page (first 4) |
| `reviews.js` | Student testimonials / success stories | "Careers, transformed" carousel on the Home page |
| `site.js` | Brand name, contact email/phone/address, social links, and **SEO** (page titles + descriptions for Google) | Footer, contact page, and every page's `<title>` / meta tags |

## How to edit

1. Open a file (e.g. `courses.js`).
2. Each item sits between `{ ... }`. Change the text inside the quotes.
3. To **add** one, copy a whole `{ ... }` line, paste it, and edit it.
   Don't forget the comma `,` at the end of each item.
4. To **remove** one, delete its whole `{ ... }` line.
5. **Save** the file and **refresh** the web page.

### Example — adding a course
```js
{ icon: '★', cat: 'Modern AI', title: 'AI Agents', meta: 'Advanced · 6 weeks', price: '₹13,999', desc: 'Build autonomous AI agents that plan and act.' },
```

## ⚠️ A few rules
- Keep the quotes `'...'` around text.
- Keep the comma `,` between items.
- Don't rename these files or remove the `window.AIKRA...` lines at the top.
- Special symbols/emoji are fine inside the quotes (e.g. `icon: '🤖'`).

## SEO (Google search info)
Open `site.js` → the `seo` section. Each page has a **title** and
**description**. These are what Google shows in search results. Keep titles
under ~60 characters and descriptions under ~155 characters for best results.
