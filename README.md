# Sade Terrace Restaurant — V2

GitHub Pages-ready static website. No npm, build, Actions or workflow is required.

## Upload

Upload these files/folders directly to the repository root:

- `index.html`
- `styles.css`
- `script.js`
- `favicon.svg`
- `assets/`
- `.nojekyll`

GitHub Pages settings:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

## What V2 fixes

- Loader has a hard failsafe and cannot permanently block the page.
- GSAP / Lenis failure falls back to a usable native page.
- Updated GSAP and Lenis CDN package paths.
- Mobile navigation added.
- Safari / mobile viewport and safe-area behavior improved.
- Reduced-motion accessibility added.
- Below-the-fold images lazy-load.
- Every remote demo image has a local SVG fallback inside `assets/images/`.
- Fake phone/WhatsApp placeholders removed.
- Contact details, Instagram and Maps links added.
- Menu rows no longer pretend to be reservation links.
- Desktop-only hover preview is disabled on touch devices.

## Important before the real launch

The main photographs are demo images. Replace them with Sade Terrace's real photography when available. The local SVG files are safety fallbacks, not final restaurant photography.

Current contact values used in this build:

- Landline: +90 242 844 23 03
- WhatsApp: +90 545 536 95 36
- Instagram: @sade.kalkan
- Address: Hasan Altan Cd. No:7, 07960 Kalkan, Kaş / Antalya


## V3 navigation update

- Quick links are now in a permanent fixed terracotta top bar.
- Phone and WhatsApp stay on the right side of the top bar on desktop.
- The duplicated Experience / Menu / Gallery / Contact navigation was removed from the lower header.
- The lower header now contains only the Sade brand and Book a Table button.
- On smaller screens, the quick links remain fixed and horizontally scrollable.


## V4 glass navigation
- Orange/terracotta top bar removed.
- Top navigation is now transparent glass with subtle dark blur.
- Menu and contact text use stronger contrast and soft shadow for readability.
