# Deploying AIKRA to GitHub Pages

Your site is a **static website** (plain HTML/CSS/JS), so it hosts on GitHub
Pages for free — no build step, no Node.js required.

---

## Option A — Upload via the GitHub website (no install)

1. Sign in at https://github.com and click **New repository**.
2. Name it (e.g. `aikra-site`), choose **Public**, click **Create repository**.
3. Click **“uploading an existing file”**.
4. Open the `static-site` folder, select **everything inside it**
   (`index.html`, the other `.html` files, `assets/`, `content/`, `README.md`)
   and drag it into the browser. Commit.
   > Upload the *contents* of `static-site` so `index.html` is at the repo root.
5. Go to **Settings → Pages**. Under **Source** choose
   **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
6. After ~1 minute your site is live at
   `https://YOUR-USERNAME.github.io/aikra-site/`

To update later: re-upload the changed files (or use “Add file → Upload files”).

---

## Option B — Using Git (recommended for ongoing work)

Install Git first: https://git-scm.com/download/win (reopen the terminal after).

Run these commands **inside the `static-site` folder**:

```powershell
cd "c:\Users\nmurug936\OneDrive - Comcast\Desktop\Doc\Web\static-site"
git init
git add .
git commit -m "Initial commit: AIKRA AI Institute site"
git branch -M main
# create an empty repo on github.com first, then paste its URL below:
git remote add origin https://github.com/YOUR-USERNAME/aikra-site.git
git push -u origin main
```

Then enable **Settings → Pages → Deploy from a branch → main → /(root)**.

Future updates:
```powershell
git add .
git commit -m "Update content"
git push
```

---

## Custom domain (optional)

1. In **Settings → Pages → Custom domain**, enter e.g. `aikra.ai`.
2. At your domain registrar add DNS records:
   - `CNAME` → `YOUR-USERNAME.github.io` (for `www`)
   - or 4 `A` records to GitHub Pages IPs (for the root domain):
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. GitHub auto-issues a free HTTPS certificate.

Remember to update `url` in `content/site.js` to your final domain so SEO/OG
tags point to the right place.

---

## Notes
- No `.nojekyll` file is needed here since we don't use folders starting with
  `_`, but you can add an empty `.nojekyll` at the root if any asset ever fails
  to load.
- Everything (courses, reviews, SEO, contact) stays editable in `content/`.
