/* Classik Finishes — site content.
   Edit this file to change contact details, rates, products or project photos.
   Every page reads from it, so a change here shows up everywhere. */
window.CF = window.CF || {};

CF.site = {
  name: "Classik Finishes",
  legalName: "Classik Finishes Ltd",
  tagline: "Towards aesthetics and value",
  phone: "0704 502 2891",
  phoneIntl: "+2347045022891",
  phone2: "0912 399 3079",
  phone2Intl: "+2349123993079",
  whatsapp: "2347045022891",
  email: "Classikfinishesltd@gmail.com",
  instagram: "https://www.instagram.com/classik_finishes/",
  instagramHandle: "@classik_finishes",
  tiktok: "https://www.tiktok.com/@classik_finishes",
  tiktokHandle: "@classik_finishes",
  serviceArea: "Nigeria",
  stats: [
    { value: "3", label: "Years in the trade", color: "#E01E83" },
    { value: "35+", label: "Projects delivered", color: "#FD5206" },
    { value: "8", label: "States covered", color: "#BB5AD7" },
    { value: "17+", label: "Team size", color: "#32C0F0" }
  ]
};

/* Client testimonials, shown on the /testimonials/ page.
   The section hides itself if this list is empty.
   PLACEHOLDERS: replace each entry with a real client's words and details before launch. */
CF.testimonials = [
  { quote: "Client testimonial goes here. Replace with the client's own words.", name: "Client name", position: "Position", company: "Company name" },
  { quote: "Client testimonial goes here. Replace with the client's own words.", name: "Client name", position: "Position", company: "Company name" },
  { quote: "Client testimonial goes here. Replace with the client's own words.", name: "Client name", position: "Position", company: "Company name" }
];

/* Priced services. price: null means "on request, after a site visit". */
CF.services = [
  { group: "overhead", id: "pop", name: "POP ceilings", price: 12000, note: "Coving, trays and recesses cast to your drawing or ours, finished smooth." },
  { group: "overhead", id: "gypsum", name: "Gypsum board ceilings", price: 14500, note: "Board work on true lines, joints taped and feathered before any paint." },
  { group: "overhead", id: "suspended", name: "Suspended ceilings", price: null, note: "Grid systems for offices and commercial floors." },
  { group: "walls", id: "paint", name: "Paint application", price: 700, note: "Interior or exterior, properly primed and finished with two coats." },
  { group: "walls", id: "screed", name: "Wall screeding", price: 1900, note: "Smooth, even surfaces that give your walls a clean final finish." },
  { group: "walls", id: "tyrolean", name: "Tyrolean application", price: 1400, note: "A hard-wearing exterior texture designed for lasting performance." },
  { group: "walls", id: "textured", name: "Textured designs", price: 13000, note: "Decorative wall textures tailored to your preferred design." },
  { group: "floors", id: "tiling", name: "Tiling", price: 2500, note: "Floor and wall tiles laid neatly and perfectly." },
  { group: "floors", id: "epoxy", name: "Epoxy flooring", price: null, note: "Smooth, seamless and durable floor coating with a clean finish." },
  { group: "floors", id: "floorpaint", name: "Stamped floor painting", price: null, note: "Decorative floor painting that adds colour, character and a finished look." }
];

CF.serviceGroups = [
  { id: "overhead", name: "Overhead", color: "#32C0F0", intro: "Ceilings framed, boarded and cast in-house, with lighting set out first." },
  { id: "walls", name: "Walls", color: "#E01E83", intro: "From a true, screeded substrate to the last coat of paint or texture." },
  { id: "floors", name: "Floors", color: "#FD5206", intro: "Floor finishes laid flat, sealed and built for daily footfall." }
];

/* Products. Use `prices` instead of `price` when a product has more than one price. */
CF.products = [
  /* Order matters: the first 4 show on the homepage. */
  { id: "screeding", name: "Screeding Finish", price: null, prices: [{ label: "Packaged", price: 26000 }, { label: "On-site production", price: 22000, unit: "" }], size: "20L", category: "protective", img: "products/Screeding Finish-web.webp", note: "Strong, fast-drying screed for interior and exterior walls, with wider coverage." },
  { id: "emulsion", name: "Emulsion Finish", price: 23000, size: "20L", category: "walls", img: "products/Emulsion Finish-web.webp", note: "For walls and ceilings, interior and exterior." },
  { id: "matt", name: "Matt Finish", price: null, size: "20L", category: "walls", img: "products/Matt Finish-web.webp", note: "Flat, non-reflective finish for walls and ceilings, interior and exterior." },
  { id: "silk", name: "Silk Finish", price: 68000, size: "20L", category: "walls", img: "products/SILK FINISH-web.webp", note: "Rich coverage, smooth application, elegant sheen." },
  { id: "gloss", name: "Gloss Finish", price: 22600, size: "4L", category: "protective", img: "products/GLOSS FINISH-web.webp", note: "Durable surface protection for wood and metal." },
  { id: "undercoat", name: "Undercoat", price: 19000, size: "4L", category: "protective", img: "products/UNDERCOAT-web.webp", note: "A smooth base for a better finish." },
  { id: "graphitex", name: "Graphitex", price: 58700, size: "20L", category: "specialty", img: "products/GRAPHITEX-web.webp", note: "Lifetime anti-crack and anti-peel formula." },
  { id: "marble", name: "Marble Stone", price: null, size: "20L", category: "specialty", img: "products/MARBLE STONE-web.webp", note: "Bold decorative texture finish." }
];

CF.productCategories = [
  { id: "walls", name: "Wall paints" },
  { id: "protective", name: "Base coats & protective" },
  { id: "specialty", name: "Specialty & decorative" }
];

/* Project gallery. type: "image" or "video". tags drive the filters on /projects. */
CF.projects = [
  { type: "video", src: "uploads/videos/empire-city-walkthrough-web.mp4", poster: "assets/img/poster-empire-city-walkthrough.jpg", title: "Empire City — site walkthrough", note: "Exterior coating and feature walls for @jomavhomesofficial on the newly launched estate.", tags: ["exteriors", "videos"], featured: true },
  { type: "image", src: "assets/img/empire-city-gatehouse.webp", title: "Empire City — entrance gatehouse", note: "Gatehouse finish for @jomavhomesofficial.", tags: ["exteriors"], featured: true },
  { type: "image", src: "assets/img/corridor-pop-paneling.webp", title: "POP ceiling & wall paneling", note: "Corridor ceiling and panel work, ready for paint.", tags: ["ceilings", "interiors"], featured: true },
  { type: "image", src: "assets/img/exterior-after-porch.webp", title: "Bungalow exterior — finished", note: "Exterior brought back to life: screeded, primed and coated.", tags: ["exteriors"], featured: true },
  { type: "image", src: "assets/img/pop-ceiling-install.webp", title: "POP ceiling — on site", note: "Our crew casting a stepped POP ceiling.", tags: ["ceilings"] },
  { type: "image", src: "assets/img/textured-exterior.webp", title: "Textured exterior render", note: "Sprayed texture and banding on a finished facade.", tags: ["exteriors"] },
  { type: "image", src: "assets/img/interior-painting.webp", title: "Interior wall painting", note: "Two-coat finish, cut in by hand at every edge.", tags: ["interiors"] },
  { type: "image", src: "assets/img/gypsum-ceiling-coffers.webp", title: "Gypsum board ceiling — stepped coffers", note: "Boarded ceiling with a run of recessed coffers, wired for lighting.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/pop-ceiling-bedroom.webp", title: "POP ceiling — bedroom tray", note: "Tray ceiling with a recessed drop, finished smooth.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/exterior-before.webp", title: "Bungalow exterior — before", note: "Where the job started: bare, patchy render.", tags: ["exteriors"] },
  { type: "image", src: "assets/img/gypsum-ceiling-corridor.webp", title: "Gypsum board ceiling — corridor", note: "Dropped gypsum bulkheads framing a corridor ceiling.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/suspended-ceiling-corridor.webp", title: "Suspended ceiling — commercial corridor", note: "Grid ceiling installed along an office corridor.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/pop-ceiling-pattern.webp", title: "POP ceiling — geometric pattern", note: "Interlocking step pattern cast in POP.", tags: ["ceilings"] },
  { type: "image", src: "assets/img/pop-ceiling-tray.webp", title: "POP ceiling — double tray", note: "Two-level tray ceiling ahead of painting.", tags: ["ceilings", "interiors"] },
  { type: "video", src: "uploads/videos/shiju-video3-web.mp4", poster: "assets/img/poster-shiju-video3.jpg", title: "Estate block — exterior finish", note: "Exterior coating across an estate block.", tags: ["exteriors", "videos"] },
  { type: "image", src: "assets/img/pop-ceiling-detail.webp", title: "POP ceiling — edge detail", note: "Crisp step lines at the ceiling edge.", tags: ["ceilings"] },
  { type: "image", src: "assets/img/pop-ceiling-room.webp", title: "Room ready for finishing", note: "Ceiling cast and walls prepared for paint.", tags: ["ceilings", "interiors"] }
];

CF.projectFilters = [
  { id: "all", name: "All work" },
  { id: "ceilings", name: "Ceilings" },
  { id: "exteriors", name: "Exteriors" },
  { id: "interiors", name: "Interiors" },
  { id: "videos", name: "Videos" }
];
