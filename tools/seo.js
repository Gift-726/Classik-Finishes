/* Classik Finishes — search engine and AI search files.
   Run after editing assets/js/data.js (prices, products, contact details):

       node tools/seo.js

   It reads data.js and rewrites, so they always match the site:
   - the <!-- seo-head --> block in each page's <head> (canonical link, share preview, structured data)
   - the <!-- seo:text --> blocks: plain-HTML copies of the rates, products, projects and testimonials
     that the page otherwise draws with JavaScript (search and AI crawlers often don't run JavaScript)
   - sitemap.xml, robots.txt and llms.txt at the site root */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext("var CF = window.CF = {};\n" + fs.readFileSync(path.join(root, "assets/js/data.js"), "utf8"), ctx);
const CF = ctx.window.CF;
const S = CF.site;
const BASE = S.url.replace(/\/$/, "");
const BIZ = BASE + "/#business";
const OG_IMAGE = BASE + "/assets/img/og-image.jpg";

const PAGES = [
  { file: "index.html", path: "/", name: "Home" },
  { file: "offerings/index.html", path: "/offerings/", name: "Offerings" },
  { file: "products/index.html", path: "/products/", name: "Products" },
  { file: "projects/index.html", path: "/projects/", name: "Projects" },
  { file: "testimonials/index.html", path: "/testimonials/", name: "Testimonials" },
  { file: "contact/index.html", path: "/contact/", name: "Contact" }
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const naira = (n) => "₦" + Number(n).toLocaleString("en-NG");
const abs = (p) => BASE + "/" + encodeURI(p).replace(/^\//, "");
const strip = (html) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, " ").trim();
const group = (id) => CF.serviceGroups.find((g) => g.id === id);
const category = (id) => CF.productCategories.find((c) => c.id === id);

function productPrices(p) {
  if (p.prices && p.prices.length) return p.prices.map((o) => ({ label: o.label, price: o.price }));
  return p.price === null ? [] : [{ label: "", price: p.price }];
}

/* ---------- Structured data (schema.org JSON-LD) ---------- */
function business() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": BIZ,
    name: S.name,
    legalName: S.legalName,
    slogan: S.tagline,
    description: "Classik Finishes is a Nigerian finishing company: paint application, wall screeding, Tyrolean and textured walls, POP, gypsum and suspended ceilings, tiling, epoxy and stamped floors, plus its own line of paints and coatings.",
    url: BASE + "/",
    logo: BASE + "/assets/img/logo.png",
    image: OG_IMAGE,
    telephone: S.phoneIntl,
    email: S.email,
    areaServed: { "@type": "Country", name: S.serviceArea },
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    sameAs: [S.instagram, S.tiktok],
    contactPoint: [
      { "@type": "ContactPoint", telephone: S.phoneIntl, contactType: "customer service", areaServed: "NG", availableLanguage: "English" },
      { "@type": "ContactPoint", telephone: S.phone2Intl, contactType: "sales", areaServed: "NG", availableLanguage: "English" }
    ],
    knowsAbout: CF.services.map((s) => s.name).concat(["Wall finishing", "Interior painting", "Exterior painting", "Paint manufacturing"])
  };
}

function serviceNodes() {
  return CF.services.map((s) => {
    const node = {
      "@type": "Service",
      "@id": BASE + "/offerings/#" + s.id,
      name: s.name,
      serviceType: s.name,
      category: group(s.group).name,
      description: s.note,
      provider: { "@id": BIZ },
      areaServed: { "@type": "Country", name: S.serviceArea }
    };
    if (s.price !== null) {
      node.offers = {
        "@type": "Offer",
        priceCurrency: "NGN",
        price: s.price,
        priceSpecification: { "@type": "UnitPriceSpecification", price: s.price, priceCurrency: "NGN", unitCode: "MTK", unitText: "per square metre, from" }
      };
    }
    return node;
  });
}

function productNodes() {
  return CF.products.map((p) => {
    const node = {
      "@type": "Product",
      "@id": BASE + "/products/#" + p.id,
      name: p.name,
      description: p.note + " " + p.size + ".",
      image: abs(p.img),
      category: category(p.category).name,
      brand: { "@type": "Brand", name: S.name },
      manufacturer: { "@id": BIZ }
    };
    const prices = productPrices(p);
    if (prices.length) {
      node.offers = prices.map((o) => ({
        "@type": "Offer",
        name: o.label ? p.name + " (" + o.label + ")" : p.name,
        price: o.price,
        priceCurrency: "NGN",
        url: BASE + "/products/#" + p.id,
        seller: { "@id": BIZ }
      }));
    }
    return node;
  });
}

function faqNode(html) {
  const re = /<details[^>]*><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;
  const items = [];
  let m;
  while ((m = re.exec(html))) items.push({ "@type": "Question", name: strip(m[1]), acceptedAnswer: { "@type": "Answer", text: strip(m[2]) } });
  return items.length ? { "@type": "FAQPage", "@id": BASE + "/contact/#faq", mainEntity: items } : null;
}

function graphFor(page, html, title, description) {
  const url = BASE + page.path;
  const webpage = {
    "@type": page.path === "/contact/" ? "ContactPage" : "WebPage",
    "@id": url + "#webpage",
    url,
    name: title,
    description,
    isPartOf: { "@id": BASE + "/#website" },
    about: { "@id": BIZ },
    inLanguage: "en-NG"
  };
  const graph = [webpage];
  if (page.path === "/") {
    graph.push({ "@type": "WebSite", "@id": BASE + "/#website", url: BASE + "/", name: S.name, publisher: { "@id": BIZ }, inLanguage: "en-NG" });
    const biz = business();
    biz.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Finishing services and products",
      itemListElement: CF.serviceGroups.map((g) => ({
        "@type": "OfferCatalog",
        name: g.name,
        itemListElement: CF.services.filter((s) => s.group === g.id).map((s) => ({ "@type": "Offer", itemOffered: { "@id": BASE + "/offerings/#" + s.id } }))
      })).concat([{
        "@type": "OfferCatalog",
        name: "Paints and coatings",
        itemListElement: CF.products.map((p) => ({ "@type": "Offer", itemOffered: { "@id": BASE + "/products/#" + p.id } }))
      }])
    };
    graph.push(biz);
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: page.name, item: url }
      ]
    });
  }
  if (page.path === "/" || page.path === "/offerings/") graph.push(...serviceNodes());
  if (page.path === "/" || page.path === "/products/") graph.push(...productNodes());
  if (page.path === "/contact/") { const f = faqNode(html); if (f) graph.push(f); }
  return { "@context": "https://schema.org", "@graph": graph };
}

/* ---------- Plain-HTML copies of script-drawn content ---------- */
const TEXT = {
  "rate-groups": () => CF.serviceGroups.map((g) =>
    "<h3>" + esc(g.name) + "</h3><ul>" + CF.services.filter((s) => s.group === g.id).map((s) =>
      "<li><strong>" + esc(s.name) + "</strong>: " + (s.price === null ? "priced on request after a site visit" : "from " + naira(s.price) + " per square metre") + ". " + esc(s.note) + "</li>").join("") + "</ul>").join(""),
  products: () => "<ul>" + CF.products.map((p) => {
    const prices = productPrices(p);
    const price = prices.length ? prices.map((o) => (o.label ? o.label + " " : "") + naira(o.price)).join(", ") : "price on request";
    return "<li><strong>" + esc(p.name) + "</strong> (" + esc(p.size) + ", " + esc(category(p.category).name) + "): " + price + ". " + esc(p.note) + "</li>";
  }).join("") + "</ul>",
  projects: () => "<ul>" + CF.projects.map((p) => "<li><strong>" + esc(p.title) + "</strong>: " + esc(p.note) + "</li>").join("") + "</ul>",
  testimonials: () => CF.testimonials.map((t) =>
    "<blockquote><p>" + esc(t.quote) + "</p><footer>" + esc(t.name) + ", " + esc(t.position) + (t.company ? ", " + esc(t.company) : "") + "</footer></blockquote>").join("")
};

function textBlock(kind) {
  return "<!-- seo:text " + kind + " --><noscript>" + TEXT[kind]() + "</noscript><!-- /seo:text -->";
}

/* ---------- Write the pages ---------- */
function headBlock(page, html) {
  const title = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || S.name);
  const description = ((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const url = BASE + page.path;
  const json = JSON.stringify(graphFor(page, html, title, strip(description))).replace(/</g, "\\u003c");
  return [
    "<!-- seo-head: generated by tools/seo.js from assets/js/data.js; edit there, then run node tools/seo.js -->",
    '<link rel="canonical" href="' + url + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="' + esc(S.name) + '">',
    '<meta property="og:locale" content="en_NG">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:title" content="' + esc(title) + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:image" content="' + OG_IMAGE + '">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<script type="application/ld+json">' + json + "</script>",
    "<!-- /seo-head -->"
  ].join("\n");
}

let changed = 0;
for (const page of PAGES) {
  const file = path.join(root, page.file);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  // Drop hand-written share tags; the generated block replaces them.
  html = html.replace(/^<meta property="og:[^>]*>\r?\n/gm, "");
  const block = headBlock(page, html);
  if (/<!-- seo-head:[\s\S]*?<!-- \/seo-head -->/.test(html)) html = html.replace(/<!-- seo-head:[^\n]*-->[\s\S]*?<!-- \/seo-head -->/, () => block);
  else html = html.replace(/<link rel="icon"/, () => block + "\n<link rel=\"icon\"");
  // Refresh any existing text blocks, then add missing ones after each data-render container.
  html = html.replace(/<!-- seo:text (\S+) -->[\s\S]*?<!-- \/seo:text -->/g, (m, kind) => textBlock(kind));
  html = html.replace(/(<(div|section)[^>]*data-render="([a-z-]+)"[^>]*>)(?!<!-- seo:text)/g, (m, open, tag, kind) => {
    if (!TEXT[kind] || (kind === "products" && page.path === "/")) return m;
    return open + textBlock(kind);
  });
  if (html !== before) { fs.writeFileSync(file, html); changed++; }
}

/* ---------- sitemap.xml, robots.txt, llms.txt ---------- */
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  PAGES.map((p) => "  <url><loc>" + BASE + p.path + "</loc><lastmod>" + today + "</lastmod></url>").join("\n") +
  "\n</urlset>\n");

// Everyone, AI search crawlers included, may read the pages. Folders the live site doesn't use
// (raw uploads, prototype files) and the large video files are kept out to save bandwidth.
fs.writeFileSync(path.join(root, "robots.txt"), [
  "User-agent: *",
  "Allow: /",
  "Disallow: /uploads/",
  "Disallow: /recents-work/",
  "Disallow: /corr/",
  "Disallow: /_ds/",
  "Disallow: /Classik%20Finishes.dc.html",
  "Disallow: /image-slot.js",
  "Disallow: /support.js",
  "",
  "Sitemap: " + BASE + "/sitemap.xml",
  ""
].join("\n"));

const contactHtml = fs.readFileSync(path.join(root, "contact/index.html"), "utf8");
const faq = faqNode(contactHtml);
const llms = [
  "# " + S.name,
  "",
  "> " + business().description + " Based in Nigeria and working across " + S.stats.find((s) => /states/i.test(s.label)).value + " states for homeowners, estate developers and commercial clients.",
  "",
  "- Phone: " + S.phone + " / " + S.phone2,
  "- WhatsApp: https://wa.me/" + S.whatsapp,
  "- Email: " + S.email,
  "- Instagram: " + S.instagram,
  "- TikTok: " + S.tiktok,
  "",
  "## Services (rates include materials and labour, confirmed after a site measure)",
  ""
].concat(CF.serviceGroups.flatMap((g) => ["### " + g.name, ""].concat(
  CF.services.filter((s) => s.group === g.id).map((s) => "- " + s.name + ": " + (s.price === null ? "priced on request" : "from " + naira(s.price) + " per sqm") + ". " + s.note), [""])))
.concat(["## Products (Classik Finishes paints and coatings)", ""],
  CF.products.map((p) => {
    const prices = productPrices(p);
    return "- " + p.name + " (" + p.size + "): " + (prices.length ? prices.map((o) => (o.label ? o.label + " " : "") + naira(o.price)).join(", ") : "price on request") + ". " + p.note;
  }), [""],
  faq ? ["## FAQ", ""].concat(faq.mainEntity.flatMap((q) => ["**" + q.name + "**", q.acceptedAnswer.text, ""])) : [],
  ["## Pages", ""], PAGES.map((p) => "- [" + p.name + "](" + BASE + p.path + ")"), [""]).join("\n");
fs.writeFileSync(path.join(root, "llms.txt"), llms);

console.log("Updated " + changed + " page(s), sitemap.xml, robots.txt and llms.txt for " + BASE);
