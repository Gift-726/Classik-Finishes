# Classik Finishes — website

A multi-page static site for **Classik Finishes**, a Nigerian painting, screeding, ceiling and flooring contractor and paint maker. Plain HTML, CSS and JavaScript, with no build step. It runs on GitHub Pages as-is.

## Pages

| URL | File | What's on it |
|---|---|---|
| `/` | `index.html` | Hero slider over the 3 estate videos, Who we are (company text + stats), What we do (colour-block cards), offerings band (no prices; **See all rates** goes to `/offerings/`), products carousel (no prices), featured projects, How we work |
| `/offerings/` | `offerings/index.html` | Per-sqm rate cards by group (Overhead / Walls / Floors) with **Add to enquiry** |
| `/products/` | `products/index.html` | Paint catalogue with category filters and **Add to enquiry** |
| `/projects/` | `projects/index.html` | Filterable photo/video gallery with lightbox, plus a before/after strip |
| `/testimonials/` | `testimonials/index.html` | Client testimonials from `CF.testimonials` in `data.js` |
| `/contact/` | `contact/index.html` | Contact cards, enquiry list + indicative estimate, form that sends via WhatsApp or email, FAQ |

Every page has the same header (top utility bar, mega-menu navigation, enquiry counter, mobile drawer) and the same footer (CTA band, link columns, contact details, legal bar). Both are defined once, in `assets/js/layout.js`.

## Files

```
assets/css/site.css   all styling (brand tokens at the top)
assets/js/data.js     CONTENT: contact details, stats, services + rates, products, projects
assets/js/layout.js   shared header, footer, navigation menu and icons
assets/js/site.js     behaviour: enquiry list, slider, mega menu, drawer, filters, lightbox, form
assets/img/           web-optimised photos, video posters, logos, favicon
products/             product tin images (also holds products/index.html)
uploads/videos/       *-web.mp4 videos used by the hero and gallery
```

## Common edits

- **Hero slides:** each slide in `index.html` has its own background video, and a slide stays up for the length of its video.

- **Change a rate, phone number, product or stat:** edit `assets/js/data.js`. Every page updates.
- **Add a project photo:** put a web-sized image in `assets/img/`, then add an entry to `CF.projects` in `data.js`. Tag it with `ceilings`, `exteriors`, `interiors` and/or `videos` so the filters pick it up. `featured: true` puts it on the homepage (the layout expects 4).
- **Change a menu link:** edit `NAV` in `assets/js/layout.js`. The desktop mega menu, the mobile drawer and the footer all update.
- **Add a page:** copy any `*/index.html`, change `data-page`, the title and the banner, and add it to `NAV`.

## How the enquiry list works

**Add to enquiry** buttons on Offerings, Products and the homepage save their IDs in `localStorage` (key `cf-enquiry-v1`). The header badge, the floating "Review & send" bar and the list on the Contact page all read from it. If the list holds services and an area is entered, the Contact page shows a combined per-sqm rate and an indicative total. On-request items are left out of the total. Sending opens WhatsApp (`wa.me/2347045022891`) or the visitor's email app with the whole enquiry pre-filled. There is no server; nothing is stored beyond the visitor's own browser.

## Running locally

Opening `index.html` straight from disk works (links are rewritten to `…/index.html` in that mode). For the closest match to GitHub Pages, run `python -m http.server` in this folder and open http://localhost:8000.

## Brand

Ink `#040529` · pale blue `#E2F8FF` · pink `#E01E83` (deep `#B01166`) · green `#8FC706` · purple `#BB5AD7` · cyan `#32C0F0` · orange `#FD5206`. Archivo 400–800 from Google Fonts. Square corners, 2px ink rules.

## Legacy

`Classik Finishes.dc.html` (plus `support.js`, `image-slot.js` and `_ds/`) is the earlier single-page design-tool prototype. The new site doesn't use it. It can be deleted once the new site is signed off.

## Before launch

- **Testimonials:** the client is collecting 3. Add them to `CF.testimonials` in `assets/js/data.js`. They show on the `/testimonials/` page. The 3 entries in the file are placeholders until then.
- There's no physical office yet, so no address is shown anywhere. Add one to the footer and Contact page if that changes.
