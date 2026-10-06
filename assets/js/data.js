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
    { value: "2", label: "Years in the trade", color: "#E01E83" },
    { value: "35+", label: "Projects delivered", color: "#FD5206" },
    { value: "8", label: "States covered", color: "#BB5AD7" },
    { value: "12+", label: "Team size", color: "#32C0F0" }
  ]
};

/* Upcoming features, linked from the top bar (and the phone menu).
   While live is false, the link opens a "coming soon" page at /<id>/ built from this entry.
   To launch one: build its real page at the same address and set live: true (the "Soon" tag disappears).
   launch: optional text such as "Launching 2027"; leave empty to show no date. */
CF.upcoming = {
  labels: {
    badge: "Soon",
    status: "Coming soon",
    notifyTitle: "Want to know when it launches?",
    notifyCopy: "Follow us for updates, or send us a message and we'll let you know when it's ready.",
    notifyWhatsApp: "Message us on WhatsApp",
    notifyMessage: "Hello Classik Finishes, please let me know when {name} launches.",
    followInstagram: "Follow on Instagram",
    followTikTok: "Follow on TikTok",
    home: "Home",
    back: "Back to home"
  },
  items: [
    {
      id: "finishers-hub", name: "Finishers Hub", live: false, launch: "", img: "assets/img/pop-ceiling-install.webp",
      summary: "A community for finishers.",
      description: "A space for finishers to connect, share their work and grow together. We're putting the finishing touches on it."
    },
    // {
    //   id: "finishers-academy", name: "Finishers Academy", live: false, launch: "", img: "assets/img/interior-painting.webp",
    //   summary: "Training for finishers.",
    //   description: "Practical training to help finishers build their skills and deliver better work. We're putting the finishing touches on it."
    // }
  ]
};

/* Client testimonials, shown on the /testimonials/ page. The section hides itself if this list is empty. */
CF.testimonials = [
  {
    quote: "One thing I appreciate about Classik Finishes is their understanding of the relationship between workmanship, material quality, cost, and the final value delivered on a project. Their team approaches finishing with attention to detail and a clear focus on delivering quality work. For a construction professional, having a finishing team that understands project expectations and can execute accordingly is a valuable advantage. I would gladly recommend Classik Finishes for finishing projects.",
    name: "Olajumoke Idowu", position: "Quantity Surveyor", company: ""
  },
  {
    quote: "For me, finishing is where the quality and character of a space truly come together, and this is an area where Classik Finishes has demonstrated a good understanding. Their attention to detail, workmanship, and approach to delivering different finishing solutions are commendable. They have shown themselves to be a team that takes the outcome of a project seriously. I would recommend Classik Finishes to clients, developers, and professionals who value quality finishing.",
    name: "Akinsiku Simeon", position: "CEO", company: "Proxima Construction"
  },
  {
    quote: "Classik Finishes has proven to be a dependable finishing partner on our projects. Their team understands the importance of proper surface preparation, workmanship, and attention to detail, and they have consistently shown professionalism in the execution of their work. Their ability to deliver quality finishes while working within project requirements is commendable. I’m pleased to recommend Classik Finishes for construction and finishing projects.",
    name: "Engr. Femi Ibitayo", position: "Head of Construction", company: "Jomav Homes"
  }
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

/* Products. Use `prices` instead of `price` when a product has more than one price;
   `short` is an optional shorter label for the product card (the full label is used in enquiries). */
CF.products = [
  /* Order matters: the first 4 show on the homepage. */
  { id: "screeding", name: "Screeding Finish", price: null, prices: [{ label: "Packaged", price: 26000 }, { label: "On-site production", short: "On-site", price: 22000, unit: "" }], size: "20L", category: "protective", img: "products/Screeding Finish-web.webp", note: "Strong, fast-drying screed for interior and exterior walls, with wider coverage." },
  { id: "emulsion", name: "Emulsion Finish", price: 23000, size: "20L", category: "walls", img: "products/Emulsion Finish-web.webp", note: "For walls and ceilings, interior and exterior." },
  { id: "matt", name: "Matt Finish", price: 65000, size: "20L", category: "walls", img: "products/Matt Finish-web.webp", note: "For walls and ceilings, interior and exterior." },
  { id: "silk", name: "Silk Finish", price: 72000, size: "20L", category: "walls", img: "products/SILK FINISH-web.webp", note: "Rich coverage, smooth application, elegant sheen." },
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
  { type: "image", src: "assets/img/exterior-before.webp", title: "Bungalow exterior — before", note: "Where the job started: bare, patchy render.", tags: ["exteriors"] },
  { type: "image", src: "assets/img/gypsum-ceiling-corridor.webp", title: "Gypsum board ceiling — corridor", note: "Dropped gypsum bulkheads framing a corridor ceiling.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/suspended-ceiling-corridor.webp", title: "Suspended ceiling — commercial corridor", note: "Grid ceiling installed along an office corridor.", tags: ["ceilings", "interiors"] },
  { type: "image", src: "assets/img/pop-ceiling-tray.webp", title: "POP ceiling — double tray", note: "Two-level tray ceiling ahead of painting.", tags: ["ceilings", "interiors"] },
  { type: "video", src: "uploads/videos/shiju-video3-web.mp4", poster: "assets/img/poster-shiju-video3.jpg", title: "Estate block — exterior finish", note: "Exterior coating across an estate block.", tags: ["exteriors", "videos"] },
  { type: "image", src: "assets/img/pop-ceiling-detail.webp", title: "POP ceiling — edge detail", note: "Crisp step lines at the ceiling edge.", tags: ["ceilings"] },
  { type: "video", src: "uploads/videos/projectsVideo1-web.mp4", poster: "assets/img/poster-projectsVideo1.jpg", title: "Suspended ceiling — office", note: "Tiled grid ceiling with fitted lighting panels.", tags: ["ceilings", "interiors", "videos"] },
  { type: "video", src: "uploads/videos/projectsVideo2-web.mp4", poster: "assets/img/poster-projectsVideo2.jpg", title: "Tyrolean application — perimeter wall", note: "Hard-wearing Tyrolean texture applied to a boundary wall.", tags: ["exteriors", "videos"] },
  { type: "video", src: "uploads/videos/projectsVideo3-web.mp4", poster: "assets/img/poster-projectsVideo3.jpg", title: "Wall screeding — new build", note: "Exterior walls screeded smooth and even, ready for the final finish.", tags: ["exteriors", "videos"] },
  { type: "video", src: "uploads/videos/projectsVideo4-web.mp4", poster: "assets/img/poster-projectsVideo4.jpg", title: "Staircase & hallway — interior finish", note: "Smooth white walls and soffit, finished to the last step.", tags: ["interiors", "videos"] }
];

CF.projectFilters = [
  { id: "all", name: "All work" },
  { id: "ceilings", name: "Ceilings" },
  { id: "exteriors", name: "Exteriors" },
  { id: "interiors", name: "Interiors" },
  { id: "videos", name: "Videos" }
];
