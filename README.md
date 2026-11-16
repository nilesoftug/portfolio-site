# Nilesoft UG website

Static site (HTML, CSS, JS — no build step) for **nilesoftug.com**.

## Structure
```
index.html
css/style.css
js/main.js
assets/favicon.svg
CNAME            (nilesoftug.com)
robots.txt, sitemap.xml
```

## Publish on GitHub Pages
1. Create a repo and push these files to the `main` branch (root).
2. Repo → Settings → Pages → Source: *Deploy from a branch*, `main` / `(root)`.
3. Custom domain: `nilesoftug.com` (the `CNAME` file already says so). Tick *Enforce HTTPS* once it is available.
4. DNS at your registrar:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`
   - Keep the existing `kadhi` record pointing at your Kadhi web host.

## Things to edit
- Contact form posts to Web3Forms (access key is in the hidden `access_key` input in `index.html`; Web3Forms keys are designed to be public). Messages go to the email registered with that key.
- WhatsApp number, phone and email appear in `index.html` (contact list, floating button, JSON-LD) and `WA` in `js/main.js`.
- Add social profile URLs to the JSON-LD as `"sameAs": [...]` once they exist.
- `assets/og-preview.png` is the 1200x630 share image used by WhatsApp, LinkedIn and X.
