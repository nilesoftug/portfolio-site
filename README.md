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
- Contact email: `hello@nilesoftug.com` appears in `index.html` (contact list, JSON-LD) and `js/main.js` (`TO`). Replace it with a real mailbox.
- The contact form opens the visitor's email app (`mailto:`). For a real form backend, use a service such as Formspree and point the form `action` to it.
- Add an `assets/og.png` (1200x630) if you want a social share image.
