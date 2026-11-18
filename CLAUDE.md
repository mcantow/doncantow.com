# doncantow.com — Don Cantow's site

Michael's dad's personal site, moved off Squarespace to GitHub Pages.

## Rules
- Started as an exact copy of his Squarespace site. Preserve his work: every page, post, quote and contact detail stays; do not remove or reword his content without Michael's OK.
- Changes Michael approved (Nov 2026): free look-alike fonts (EB Garamond, Montserrat) in `assets/static-copy.css`; "Powered by Squarespace" footer line removed; signal-flag favicon (sailing flags D + C); a redesign Michael picked over several rounds.
- Design direction (Michael's words): older, mature, restrained senior executive who likes things nice; "dark theme $100M sail-powered yacht". Not preppy/"retired Connecticut", not polished SaaS. Colour used sparingly; portrait in colour, never black-and-white.

## Design
- `index.html` (and `home.html`, same content): hand-built dark home page, "horizon line" opening, then chapters 01 Profile, 02 Record (spec sheet), 03 Career, 04 Writing, 05 Contact. Every fact comes from his own pages. Its CSS is inline in the page.
- All other pages: Squarespace markup restyled by `assets/site-theme.css` (loaded after `static-copy.css`): near-black, warm off-white text, one champagne accent `#b9a27a`.
- `assets/don-cut.png`: his headshot cut out of its white background (the original jpgs stay). `assets/favicon.png`: the flag icon.

## Layout
- One `.html` file per Squarespace page, at the same address (`sales-value.html` serves `/sales-value`; posts under `blog/YYYY/M/D/slug.html`).
- `work-experience.html` and `skills.html` redirect to the first page of each menu folder, as Squarespace did.
- `assets/` holds every stylesheet, image and icon pulled from Squarespace; `assets/static-copy.js` replaces Squarespace's scripts (phone menu, folder links).
- `_workspace/` (not committed): the raw archive of the old site, the mirror tools, and four unused redesign concepts.

## Hosting
- **Live now at https://doncantow.pages.dev** (Cloudflare Pages project `doncantow`, account michaelcantow@gmail.com, direct upload, not Git-connected). GitHub Pages can't give it its own address: every Pages site on mcantow goes through michaelcantow.com, and Michael ruled out both that and a separate GitHub org (Nov 2026).
- Re-publish after a change: copy the committed files (`git ls-files`, minus CLAUDE.md/README.md/.gitignore) to a temp folder, then `npx wrangler pages deploy <folder> --project-name doncantow --branch main`.
- At the domain move: transfer doncantow.com to Cloudflare and attach it to the `doncantow` Pages project.
- Repo `mcantow/doncantow.com`, GitHub Pages from `main` /. Custom domain set to doncantow.com (CNAME file), so it is never served under michaelcantow.com. Until the domain points here, the site is only reachable once DNS moves; preview locally with `python -m http.server`.
- Domain doncantow.com is registered at **GoDaddy** (transfer-locked, expires 2027-06-12); Squarespace only hosts the pages. Plan: move the domain to Cloudflare, then add a `CNAME` file containing `doncantow.com` and point DNS at GitHub Pages.

## Checking changes
Serve locally (`python -m http.server`) and screenshot with Playwright (Chrome channel) at desktop and phone width; after publishing, check https://doncantow.pages.dev. The scripts in `_workspace/tools/` show how the original copy was made.
