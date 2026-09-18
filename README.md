# Handoff: Classik Finishes — marketing site

## Overview
A one-page marketing site for **Classik Finishes**, a Nigerian painting, screeding and ceiling-installation contractor. It presents the trade offering, per-sqm rates with an interactive quote builder, a recent-work/gallery section fed by the client's own photos and video, and a contact/booking block wired to WhatsApp, phone and email.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype of the intended look, copy and behaviour. They are **not production code to copy verbatim**. The task is to **recreate this design in the target codebase's environment** (React/Next, Vue, Astro, WordPress theme, etc.) using that project's established component patterns, routing and build tooling. If no codebase exists yet, pick the most appropriate framework (a static Astro or Next site suits this content) and implement the design there.

The prototype is authored as a single "Design Component" HTML file: markup in an `<x-dc>` template with `{{ value }}` holes, and a `class Component extends DCLogic` logic block at the bottom that behaves like a React class component (`state`, `setState`, lifecycle) and returns template values from `renderVals()`. Read it as "JSX-equivalent markup + a React component" and port accordingly.

## Fidelity
**High-fidelity.** Final brand colours, type treatment, spacing, animation timings and copy. Recreate pixel-accurately using the target codebase's own primitives.

## Sections / Views

### 1. Nav (sticky-feel header bar)
- Full-width, white, 2px bottom border `#040529`, horizontal padding `clamp(20px,5vw,72px)`.
- Left: horizontal logo PNG at 38px height (34px in the footer).
- Links (13px, ink `#040529`): Work · Gallery · What we offer · Rates · Book · Contact.
- Right: primary button "Get an estimate" → `#book`, fill `#E01E83`, white label, 0 radius.

### 2. Hero (`#top`)
- Full-bleed dark section, `min-height: min(88vh, 760px)`, background `#040529`, content bottom-aligned.
- **Background video**: the client walkthrough MP4, `object-fit: cover`, autoplay + muted + loop + playsInline, started imperatively in `componentDidMount` (`v.muted = true; v.play().catch(()=>{})`, retried on `loadeddata`) — the bare `autoplay` attribute is unreliable.
- **Scrim**: `linear-gradient(to right, rgba(4,5,41,.92) 0%, rgba(4,5,41,.78) 42%, rgba(4,5,41,.35) 100%)`.
- **Brand rule**: five equal 10px-tall bars, `#8FC706 #BB5AD7 #32C0F0 #E01E83 #FD5206`, max width 420px.
- **Headline** (`font-size: clamp(38px,5.6vw,76px)`, line-height 1.04, letter-spacing -0.025em, optical left margin `-0.055em`), one `<span style="display:block">` per line with staggered entrance:
  1. "Paint is the **last**" — "last" in `#8FC706`
  2. "ten percent." — whole line `#32C0F0`
  3. "We treat it like" — white
  4. "the **first.**" — "first." in `#FD9A06`
- **Sub-copy**: 17px / 1.65, `#E2F8FF`, max 48ch — the services summary sentence.
- **Buttons**: primary "See rates & book" (`#E01E83`) → `#services`; ghost "See recent work" (white border/label) → `#work`.
- **Art panel** (right): inset framed panel, 2px white border, `rgba(4,5,41,.82)` fill, holding the paint-splash PNG (`object-fit: cover`); floats on a 7.5s `cfFloat` loop, with drifting colour bars behind it and a subtle mousemove parallax applied to the panel and the text block (skipped under `prefers-reduced-motion`).
- Keyframes: `cfRise` (translateY + fade in, 760ms `cubic-bezier(.2,.8,.2,1)`, staggered 80/200/320/440/560/660ms), `cfFloat`, `cfDrift`.

### 3. Stat row
Four cells, `repeat(auto-fit,minmax(150px,1fr))`, 42px vertical padding, 2px rules above and below. Numbers `clamp(32px,3.4vw,46px)` in `#E01E83`, `#FD5206`, `#BB5AD7`, `#040529`; labels 13px uppercase, letter-spacing .08em, `#3c3d55`. Values: **18** years in the trade · **940+** rooms and facades finished · **2yr** written workmanship warranty · **0** subcontracted crews. *(These are placeholder metrics — confirm with the client before launch.)*

### 4. "We offer these" (`#offer`)
Two equal columns, `repeat(auto-fit,minmax(300px,1fr))`, gap `clamp(28px,4vw,64px)`, `align-items: stretch` so both columns end level.
- **Left**: photo frame, `min-height:320px`, fill `#E2F8FF`, 2px ink outline — an editable image drop slot in the prototype; in production this is a normal responsive `<img>` with `object-fit: cover`.
- **Right**: eyebrow "We offer these" (13px uppercase, .1em tracking, `#B01166`); H2 "Surfaces your building can rely on." `clamp(28px,3.4vw,44px)`/1.06; intro 14.5px `#3c3d55`; then five ruled rows (15px vertical padding, first row 2px top rule, others 1px `#dcdde6`, last row 2px bottom rule). Each row: a 14×14px brand-colour square + 17px heading + 14px `#5a5b70` description.
  1. Paint application on walls and objects — `#8FC706`
  2. Effective wall screeding — `#32C0F0`
  3. Gypsum board & POP ceiling installation — `#BB5AD7`
  4. Decorative wall designs — `#E01E83`
  5. Project support — `#FD5206`

### 5. Services & rates (`#services`) — the quote builder
- Header: eyebrow "What we do", H2 "Two trades, priced by the square metre.", right-aligned note about materials/labour inclusion.
- Two labelled groups, each introduced by a 44×10px colour bar + H3 + one-line description: **Overhead** (`#32C0F0`) and **Walls** (`#E01E83`).
- Each group renders a card grid, `repeat(auto-fit,minmax(265px,1fr))`, gap `clamp(16px,2vw,24px)`, cards `min-height:290px`, 2px border, padding 26px 24px 22px, rows `auto auto 1fr auto`.
- Card anatomy: 26×6px colour chip + zero-padded index (01, 02…) top row; service name `clamp(20px,2vw,24px)`; 14px description; then unit label (11.5px uppercase `#3c3d55`), amount `clamp(24px,2.6vw,30px)`, and a full-width text button with a 2px top rule.
- **Selected state**: card background `#E2F8FF`, border `#040529`, button label "Added to quote" in `#B01166`; unselected is white, border `#dcdde6`, label "Add to quote".
- Data (₦, per sqm, formatted `en-NG`):
  | Group | Service | Rate |
  |---|---|---|
  | Overhead | POP ceilings | from ₦11,920 |
  | Overhead | Gypsum board ceilings | from ₦14,500 |
  | Overhead | Suspended ceilings | On request (after site visit) |
  | Walls | Paint application | from ₦700 |
  | Walls | Wall screeding | from ₦1,900 |
  | Walls | Tyrollean application | from ₦1,400 |
  | Walls | Textured designs | from ₦13,000 |
  | Walls | Marble stone designs | On request |

### 6. Your selection (`#book`)
2px-bordered box, two columns `repeat(auto-fit,minmax(300px,1fr))`.
- **Left**: running summary sentence ("N selected — …" or the empty-state prompt); an "Area to cover (sqm)" text input (`inputmode="decimal"`); then **Combined rate** (sum of selected per-sqm rates) and **Indicative total** (rate × area) in `#E01E83` at `clamp(28px,3.4vw,42px)`; plus a note. If any on-request item is selected the note switches to "Suspended ceilings and marble stone are quoted after a site visit — not included in this figure."
- **Right** (`#E2F8FF` fill): H3 "Ready when you are.", copy, then three flush-left buttons — primary "Book a project on WhatsApp" (`wa.me` deep link with a prefilled message listing the selected services and area), ghost "Book a measuring session" → `#quote`, ghost "Call the office" → `tel:`.

### 7. Recent work (`#work`)
Two equal tiles inside a 2px ink border with 2px gaps (grid `minmax(0,1fr) minmax(0,1fr)`), each tile `1fr auto` (square media + caption with a 2px top rule).
- **Tile 1**: the Empire City gatehouse photo; caption "Empire City — entrance gatehouse" + credit line linking `@jomavhomesofficial`.
- **Tile 2**: the walkthrough video, **no native controls**, muted + loop + playsInline. Two overlays: a pink "Play walkthrough"/"Pause" toggle button bottom-left, and a dark "Replace video" file-input label top-right (`accept="video/*"`, swaps the src via `URL.createObjectURL`). Caption title/description come from props.
- The hero and this tile reference the **same MP4**; two concurrent playbacks of one resource contend and freeze the hero, so the toggle pauses the hero before playing the tile and resumes it on pause. In production, either serve a separate/derivative file for one of them or keep this handoff rule. IntersectionObserver-based gating was tried and is unreliable in embedded previews.

### 8. Gallery (`#gallery`)
Eyebrow "Gallery" + intro; then nine square cells, `repeat(auto-fit,minmax(240px,1fr))`, white grid background with 2px gaps and a 2px ink `outline` on each cell (outlines, not borders, so an incomplete final row never leaves a dark empty cell). Below: "More jobs on Instagram" and a link to `@classik_finishes`. Captions/placeholders in order: POP ceiling — finished tray · Exterior elevation · Textured feature wall · Screeding in progress · Gypsum board ceiling · Marble stone detail · Tyrollean facade · Suspended ceiling grid · Painted interior — finished room.

### 9. Process (`#process`)
`#E2F8FF` band with 2px rules top and bottom. Eyebrow "How a job runs", then a 2×2 grid of white cards (2px gaps on an ink background, 28px padding): STEP 01 Walkthrough · STEP 02 Line-item estimate · STEP 03 Prep & protect · STEP 04 Coat & sign-off, each step label in a different brand colour (`#8FC706`, `#32C0F0`, `#E01E83`, `#FD5206`).

### 10. Testimonial
Flush-left blockquote, `clamp(24px,2.6vw,34px)`/1.25, max 34ch, with an attribution line at 15.5px `#3c3d55`. *(Placeholder quote — replace with a real client testimonial.)*

### 11. Contact (`#quote`)
Ink `#040529` band, white text, two columns.
- Left: brand colour rule, H3 "Free walkthrough, / honest number." (second line `#32C0F0`), lead-time copy, then the two phone numbers at `clamp(22px,2.3vw,28px)` and the email in `#32C0F0`.
- Right: three white-filled inputs (Name / Phone or email / What needs painting) with uppercase 13px labels in `#E2F8FF`, then a flush-left primary button "Request the site visit" that opens a prefilled `mailto:`.

### 12. Footer
Logo at 34px + a single 13px `#3c3d55` line: "Licensed and insured. {serviceArea} — {phone} · {phone2} · {email}".

## Interactions & Behavior
- **Quote builder**: `toggle(id)` adds/removes a service in `state.selected`; the summary, combined rate and indicative total recompute on every change; `state.area` is parsed with `parseFloat(String(area).replace(/[^0-9.]/g,''))` so "180 sqm" still works. On-request items contribute ₦0 and switch the disclaimer.
- **Deep links** rebuild on every render: WhatsApp `https://wa.me/2347045022891?text=…`, `tel:+2347045022891`, and a `mailto:` with subject and body — all URL-encoded from the current selection.
- **Hero video**: imperative `play()` on mount and on `loadeddata`; muted so autoplay is permitted.
- **Recent-work video**: click-to-play toggle (pauses hero → plays tile → resumes hero on pause). "Replace video" sets `state.pickedVideo` from a local file and re-primes playback in `componentDidUpdate`.
- **Hero parallax**: `mousemove` on the hero rect translates the art panel and text block a few pixels; disabled under `prefers-reduced-motion`; listener removed in `componentWillUnmount`.
- **Anchor nav**: in-page `<a href="#…">` jumps only — no routing.
- **Responsive**: every grid is `auto-fit`/`minmax` and collapses to one column on narrow viewports; type uses `clamp()` throughout; no fixed widths.
- Not built (needs backend): real form submission, gallery lightbox, Instagram feed ingestion.

## State Management
```
selected:     { [serviceId]: true }   // quote-builder picks
area:         string                  // raw sqm input
pickedVideo:  string | null           // object URL from "Replace video"
workPlaying:  boolean                 // recent-work tile play state
```
Derived per render: picked list, combined rate, indicative total, disclaimer text, summary sentence, WhatsApp/tel/mailto links. Editable text props with defaults: `phone` "0704 502 2891", `phone2` "0912 399 3079", `email` "Classikfinishesltd@gmail.com", `serviceArea` "Nigeria", `workVideo`, `workVideoTitle`, `workVideoNote`.

## Design Tokens
**Brand (from the client's brand-colour sheets)**
```
Ink / primary dark   #040529
Pale blue surface    #E2F8FF
White                #FFFFFF
Accent pink          #E01E83   (deep step #B01166 for small text, #C71774 pressed)
Accent green         #8FC706
Accent purple        #BB5AD7
Accent cyan          #32C0F0
Accent orange        #FD5206   (amber variant #FD9A06 in the headline)
```
**Derived text greys**: `#2a2b45` body on white, `#3c3d55` secondary, `#5a5b70` card descriptions, `#dcdde6` hairline rules.

**Type** — Archivo (headings and body) from the Modernist design system, loaded via its stylesheet as `--font-heading` / `--font-body`. Scale used: hero `clamp(38px,5.6vw,76px)`; section H2 `clamp(28px,3.4vw,44px)`; group H3 `clamp(22px,2.4vw,30px)`; card titles 17–24px; body 14–17px; eyebrows/labels 11.5–13px uppercase with .08–.1em tracking. Headline letter-spacing -0.022em to -0.025em with an optical left margin of about -0.05em.

**Layout** — content max-width 1240px, horizontal padding `clamp(20px,5vw,72px)`; section padding `clamp(44px,6vw,96px)`; grid gaps 2px (hairline-grid blocks) or `clamp(16px,2vw,24px)` (card grids).

**Radius: 0 everywhere. Borders: 2px solid ink for structure, 1px `#dcdde6` for list rules. No shadows.**

**Motion** — `cfRise` 760ms `cubic-bezier(.2,.8,.2,1)` staggered 80–660ms; `cfFloat` 7.5s ease-in-out infinite; `cfDrift` 11–13s ease-in-out infinite.

## Assets
All in `uploads/` and included in this bundle:
- `horizontal logo png.png` — nav and footer logo (client-supplied).
- `Stacked Logo.png` — alternate lockup, currently unused.
- `Copilot_20260915_143106.png` — hero paint-splash artwork (client-supplied, AI-generated).
- `When it comes to delivering the best…jomavhomesofficial constr.webp` — Empire City gatehouse photo (client-supplied).
- `Thank you @jomavhomesofficial…Emipre City.r.mp4` — walkthrough video, used by both the hero background and the Recent-work tile.
- `Brand Colors.pdf`, `Brand Colors 2.pdf` — the client's brand-colour sheets (source of the palette above).
Gallery cells and the "We offer these" photo are empty drop slots awaiting real job photography.

## Files
- `Classik Finishes.dc.html` — the current design (template + logic + editable props).
- `Classik Finishes v1 (generic).dc.html` — earlier pre-brand draft, kept for reference only.
- `image-slot.js`, `support.js` — prototype runtime helpers; **do not port**. Replace every `<image-slot>` with a plain responsive `<img>` in production.
- `_ds/modernist-…/` — the Modernist design system (stylesheet supplying Archivo, the token variables and the `.btn`/`.nav`/`.input` classes). Map these onto the target codebase's own design system.

## Known gaps before launch
Replace the placeholder stat row and testimonial with real figures and a real client quote; fill the nine gallery slots and the "We offer these" photo; confirm the service area wording (currently just "Nigeria"); wire the contact form to a real endpoint; supply rates for suspended ceilings and marble stone designs.
