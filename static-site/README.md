# AIKRA AI Institute — Futuristic Static Site (2040 edition)

> **"Neon Nebula" theme** · Runs with ZERO installation. No Node.js, no build. Open in a browser.

## ▶️ Run it

Already running via Python? Just open **http://localhost:5500**. Otherwise:

```powershell
cd static-site
python -m http.server 5500
```
Then open **http://localhost:5500**. (Or simply double-click `index.html`.)

> Best experienced served (Python or VS Code **Live Server**) so the animated canvas + fonts load fully.

## 🌌 The futuristic design
- **Deep-space** background with an animated **particle network** (connects to your cursor).
- **Aurora** gradient blobs + moving **grid floor**.
- **Holographic glass** cards with animated gradient borders + **3D tilt**.
- **Premium glow** headings, **Sora** display font + **Inter** body.
- **Magnetic buttons**, rotating hero words, orbiting hero visual, marquee, animated counters, carousel.

## 📁 Structure
```
static-site/
├── index.html      # Homepage
├── courses.html    # Programs + search/filter
├── about.html      # About
├── contact.html    # Contact
└── assets/
    ├── favicon.svg
    ├── css/styles.css    # 🎨 theme tokens + all styling (edit here)
    └── js/
        ├── partials.js   # 🧩 backdrop + header + footer (edit once)
        └── app.js        # particles, tilt, magnetic, counters, carousel
```

## ✏️ Edit in one place
| Change | Where |
| --- | --- |
| Colors / glow / fonts | `assets/css/styles.css` → `:root` block |
| Header + footer + backdrop | `assets/js/partials.js` |
| Program list | `COURSES` array in `courses.html` |
| Featured (home) | `FEAT` array in `index.html` |

## ☁️ Go live free (no build)
Drag the `static-site` folder onto **Netlify Drop** → https://app.netlify.com/drop
