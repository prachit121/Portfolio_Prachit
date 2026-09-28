# Prachit Bagade - Portfolio

A responsive, static portfolio for a backend and C++ developer. Open `index.html` directly in a modern browser. No package installation or build step is required.

## Content

The experience, education, skills, contact email, and LinkedIn URL come from the supplied LinkedIn PDF. The profile's four-year experience statement is preserved; dates are displayed without calculated durations. No personal projects, client names, performance metrics, or availability claims have been invented. The mobile phone number is intentionally not displayed.

The PDF contains no portrait. The hero uses an original interactive Three.js compute-system scene instead. A personal photo can be added later once supplied.

## Files

- `index.html`: profile content, navigation, and metadata.
- `styles.css`: responsive layout and visual design.
- `script.js`: Three.js scene, motion controls, navigation state, and email copying.
- `assets/`: local Three.js and Lucide libraries, favicon, and profile download.

The scene supports pointer rotation, pause/play, reset, and reduced-motion preferences. It stops animating when offscreen or the tab is hidden. All profile content remains available if WebGL is unavailable. Email copying depends on browser clipboard permissions; the email link always works.

Fonts are served by Google Fonts, with local generic fallbacks. All scripts are local. Three.js and Lucide retain their upstream licenses in `assets/`.

## Publishing

Upload this folder to a static host such as GitHub Pages, Netlify, or Cloudflare Pages. No build command is needed; publish the project root. Review the public email and profile PDF before publishing: the original PDF includes your phone number. Remove or replace the download if you prefer not to publish that information.