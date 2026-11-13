# Daniel Rocha: portfolio

Personal site of Daniel Rocha (D_R0x), a security-focused engineer in San José, Costa Rica.
Live at <https://rocha-29.github.io/my_portfolio/>.

It is a single static page: HTML, CSS and a little vanilla JavaScript.
There is no framework, no build step, no tracker and no third-party request of any kind.
A Content Security Policy meta tag (`default-src 'self'`, no inline scripts, no inline styles) enforces that.

## Structure

```
index.html                  The whole site (one page, anchor navigation)
404.html                    Not-found page (uses absolute /my_portfolio/ paths, see below)
css/styles.css              All styles; design tokens for both themes are at the top
js/theme.js                 Loaded in <head>: applies the saved theme before first paint
js/data.js                  CONTENT: labs, projects and certifications (window.PORTFOLIO)
js/render.js                Turns data.js into HTML (shared by the browser and the helper below)
js/main.js                  Enhancements: render from data, lab filter, mobile menu, theme toggle
tools/build-static.mjs      Optional helper: copies data.js content into index.html as the no-JS fallback
assets/favicon.svg          DR monogram
assets/og-preview.png       1200x630 link preview image
assets/Daniel_Rocha_Resume.pdf
docs/LAB_WRITEUP_TEMPLATE.md  Template for lab write-ups
robots.txt, sitemap.xml, .well-known/security.txt, .nojekyll
```

## How to add or edit a lab

1. Open `js/data.js` and add or edit an entry in the right group (`featured`, `hands-on` or `earlier`).
   The fields are documented at the top of the file. Use one of the four statuses exactly:
   `Published`, `Write-up in progress`, `Building`, `Planned`.
2. Refresh the static fallback so the page still shows everything with JavaScript turned off:

   ```
   node tools/build-static.mjs
   ```

   This rewrites the HTML between `<!-- BEGIN:labs -->` and `<!-- END:labs -->` (and the matching
   `certs` markers) in `index.html`. No Node? Edit that block by hand and copy an existing `<li class="lab">`.
3. Open `index.html` in a browser and check it, then commit both files.

The three featured labs have the ids `flagship-1`, `flagship-2` and `flagship-3`.

Only mark a lab `Published` when the repository or write-up is public, and put the link in `links`.

## How to add a certification verify link

In `js/data.js`, set `verifyUrl` on the certification, then run `node tools/build-static.mjs`.
The "Verify" link only appears when the URL is set.

## Preview locally

```
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The 404 page uses absolute `/my_portfolio/` paths, so to preview it
serve the parent folder instead and open `/my_portfolio/404.html`.

## Deploy to GitHub Pages

1. Copy the contents of this folder to the root of the `rocha-29/my_portfolio` repository,
   including the hidden `.nojekyll` file and `.well-known` folder.
2. Commit and push to `main`.
3. In the repository: Settings, Pages, "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Wait a minute and open <https://rocha-29.github.io/my_portfolio/>.

If the repository is ever renamed or moved to a custom domain, update: the canonical link, the Open Graph and
Twitter image URLs and the JSON-LD block in `index.html`; `robots.txt`; `sitemap.xml`;
`.well-known/security.txt`; and the absolute paths in `404.html`.

## Checklist for Daniel

- [ ] Add `verifyUrl` for each certification in `js/data.js` (ISC2, Cisco via Credly, Splunk, IBM).
- [ ] Replace the three featured labs (`flagship-1..3`) with final content, repository and write-up links.
- [ ] Add links to the "Hands-on work" entries as each write-up is published, and change their status.
- [ ] Move Security+ and PenTest+ from "working toward" into `certifications` once earned.
- [ ] The resume PDF contains your phone number. The HTML does not. Replace
      `assets/Daniel_Rocha_Resume.pdf` with a version without it if you do not want it public.
- [ ] Update `Expires` in `.well-known/security.txt` before 11 Nov 2027.
- [ ] Update `lastmod` in `sitemap.xml` after significant changes.
- [ ] After each edit to `js/data.js`, run `node tools/build-static.mjs`.

## Notes

- `security.txt` is served at `/my_portfolio/.well-known/security.txt`. RFC 9116 expects the file at the root
  of the host, which a GitHub project page cannot control, so scanners will not discover it automatically.
- Response headers such as `frame-ancestors`, HSTS or `X-Content-Type-Options` cannot be set on GitHub Pages.
  The CSP here is delivered by meta tag, which covers everything a meta tag is allowed to cover.
