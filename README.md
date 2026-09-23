# Sade Terrace — V6 Premium

GitHub Pages-ready static website.

## Upload

Upload everything in this folder to the root of your GitHub repository:

- index.html
- styles.css
- script.js
- favicon.svg
- .nojekyll
- assets/

Then use GitHub Pages:
Settings → Pages → Deploy from a branch → main → /(root)

## What changed in V6

- Completely reworked visual hierarchy.
- Transparent glass top navigation that becomes darker on scroll.
- Stronger Sade hero section.
- New "A slower kind of evening" story section.
- Refined "Dinner Above Kalkan" editorial section.
- Menu rows are now text-only: no cursor-following / hover photos.
- Added Signature Plates section.
- Rebuilt gallery in an editorial layout.
- Added Instagram strip.
- Improved reservation section and footer.
- Added accessibility / reduced-motion handling.
- Added loader fail-safe so the site cannot get stuck if CDN scripts fail.
- Removed Lenis dependency for greater reliability.

## Important before final launch

The current food / atmosphere images are demo images from Unsplash.

For the final version, replace them with Sade Terrace's real photography:
- terrace at sunset
- terrace at night
- Kalkan view
- 4–6 signature dishes
- cocktail close-up
- guests / table atmosphere

Each image already has a local fallback SVG in `assets/images/`.


## V7 — Accordion menu

- Menu categories now open inline on click.
- Only one category stays open at a time.
- Clicking the open category again closes it.
- Dish rows animate in with GSAP when available.
- Works without GSAP as a normal accessible accordion.
- Keyboard accessible via native button controls.
- No cursor-following or hover images.
- Current dish names are example content for layout preview; replace with the restaurant's real menu before launch.
