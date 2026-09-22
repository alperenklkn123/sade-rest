# Sade Terrace Restaurant Website

Static, GitHub Pages-ready restaurant website.

## Files

- `index.html`
- `styles.css`
- `script.js`

No npm / build step required.

## GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Save.

The site will be published through GitHub Pages.

## Before launch

Search `index.html` and replace:

- `+900000000000` with the restaurant phone number.
- `https://wa.me/900000000000` with the WhatsApp number.
- `Instagram ↗` placeholder link.
- `Google Maps ↗` placeholder link.
- Address if required.
- Current Unsplash images with real Sade Terrace photos.

## Images

The demo currently uses remote Unsplash images so the project stays lightweight.
For production, replace the URLs with the restaurant's own photos.

Recommended folder structure if you add local images:

assets/
  hero.jpg
  terrace.jpg
  seafood.jpg
  steak.jpg
  cocktails.jpg

Then update each `<img src="...">` path in `index.html`.
