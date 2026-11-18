# doncantow.com — Don Cantow's site

Michael's dad's personal site, moved off Squarespace to GitHub Pages.

## Rules
- This is an **exact copy** of his Squarespace site. Preserve his work: do not remove, reword or restyle anything (pages, posts, quotes, contact details, footer) without Michael's OK.
- The only accepted difference: Squarespace's licensed Adobe fonts are replaced by free look-alikes (EB Garamond, Montserrat) in `assets/static-copy.css`, under the original font names. Michael confirmed the copy matches (Nov 2026).

## Layout
- One `.html` file per Squarespace page, at the same address (`sales-value.html` serves `/sales-value`; posts under `blog/YYYY/M/D/slug.html`).
- `work-experience.html` and `skills.html` redirect to the first page of each menu folder, as Squarespace did.
- `assets/` holds every stylesheet, image and icon pulled from Squarespace; `assets/static-copy.js` replaces Squarespace's scripts (phone menu, folder links).
- `_workspace/` (not committed): the raw archive of the old site, the mirror tools, and four unused redesign concepts.

## Hosting
- Repo `mcantow/doncantow.com`, GitHub Pages from `main` /. Custom domain set to doncantow.com (CNAME file), so it is never served under michaelcantow.com. Until the domain points here, the site is only reachable once DNS moves; preview locally with `python -m http.server`.
- Domain doncantow.com is registered at **GoDaddy** (transfer-locked, expires 2027-06-12); Squarespace only hosts the pages. Plan: move the domain to Cloudflare, then add a `CNAME` file containing `doncantow.com` and point DNS at GitHub Pages.

## Checking changes
Compare against the live Squarespace site (while it exists) with headless Chrome; the scripts in `_workspace/tools/` show how the copy was made.
