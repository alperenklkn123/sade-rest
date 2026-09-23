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


## V8 — Mobile WOW polish

Built after reviewing the real iPhone screen recording.

### Mobile changes
- Desktop top link bar is replaced by a single compact glass brand header.
- Added a full-screen editorial mobile navigation with large typography.
- Added a floating bottom Menu / Book a table CTA with iPhone safe-area support.
- Added a subtle scroll progress bar.
- Hero is optimized for `100dvh` / modern iPhone browser chrome.
- All accordion categories start closed on mobile, keeping the menu compact.
- Menu dish descriptions stack cleanly beneath dish names instead of squeezing into a narrow right column.
- Signature dishes use horizontal swipe / scroll-snap cards on mobile.
- Gallery uses a premium horizontal swipe layout on mobile.
- Instagram imagery becomes a swipe strip instead of a cramped grid.
- Reduced unnecessary vertical dead space.
- Reservation and footer spacing account for the fixed mobile CTA.
- Added Escape-to-close and accessible `aria-expanded` handling for the mobile navigation.
