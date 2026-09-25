/* Classik Finishes — shared header and footer.
   Each page includes this script twice:
     <script src=".../assets/js/layout.js" data-part="header"></script>   (first thing in <body>)
     <script src=".../assets/js/layout.js" data-part="footer"></script>   (last thing before site.js)
   The markup is written in place, synchronously, so there is no flash of a missing header. */
(function () {
  var CF = window.CF = window.CF || {};
  var script = document.currentScript;
  var part = script.getAttribute("data-part");

  // Site root, worked out from this script's own URL so links work at any folder depth.
  if (!CF.root) CF.root = script.src.replace(/assets\/js\/layout\.js.*$/, "");
  var isFile = location.protocol === "file:";

  // Folder links ("products/") need an explicit index.html when the site is opened from disk.
  CF.url = function (path) {
    path = path || "";
    if (isFile) path = path.replace(/(^|\/)(#|$)/, "$1index.html$2");
    return CF.root + path;
  };

  var ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="1"/><path d="m22 7-10 6L2 7"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    tiktok: '<path d="M9 12a4 4 0 1 0 4 4V3c.5 2.6 2.4 4.5 5 5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    list: '<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/>',
    play: '<polygon points="7 4 20 12 7 20 7 4"/>',
    pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'
  };
  CF.icon = function (name, size) {
    size = size || 18;
    return '<svg class="icon" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  };

  var S = CF.site;
  var u = CF.url;
  var img = function (p) { return CF.root + p; };
  var brandBar = '<span class="brandbar" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>';

  /* Navigation — one list drives the desktop mega menus, the mobile drawer and the footer. */
  var NAV = [
    { id: "what-we-do", label: "What we do", href: "#what-we-do" },
    {
      id: "offerings", label: "Offerings", href: "offerings/",
      blurb: "Transparent rates by the square metre, with materials and labour included.",
      img: "assets/img/pop-ceiling-install.webp",
      links: [
        { label: "Ceiling rates", href: "offerings/#overhead", desc: "POP, gypsum and suspended" },
        { label: "Wall rates", href: "offerings/#walls", desc: "Paint, screeding and textures" },
        { label: "Floor rates", href: "offerings/#floors", desc: "Tiling, epoxy and stamped" },
        { label: "Build an enquiry", href: "contact/#enquiry", desc: "Send your picks in one go" }
      ]
    },
    {
      id: "products", label: "Products", href: "products/",
      blurb: "Classik paints and coatings: the same materials our crews use on site.",
      img: "products/SILK FINISH-web.webp", imgContain: true,
      links: CF.products.map(function (p) {
        return { label: p.name, href: "products/#" + p.id, desc: p.note };
      })
    },
    { id: "projects", label: "Projects", href: "projects/" },
    { id: "testimonials", label: "Testimonials", href: "testimonials/" },
    { id: "contact", label: "Contact", href: "contact/" }
  ];
  CF.nav = NAV;

  function header() {
    var page = document.body.getAttribute("data-page") || "";

    var desktop = NAV.map(function (item) {
      var current = page === item.id ? ' aria-current="page"' : "";
      if (!item.links) {
        return '<li class="nav-item"><a class="nav-link" href="' + u(item.href) + '"' + current + ">" + item.label + "</a></li>";
      }
      var links = item.links.map(function (l) {
        return '<li><a href="' + u(l.href) + '"><span class="mega-link-title">' + l.label + " " + CF.icon("arrow", 14) + '</span><span class="mega-link-desc">' + l.desc + "</span></a></li>";
      }).join("");
      return (
        '<li class="nav-item has-mega">' +
          '<a class="nav-link" href="' + u(item.href) + '"' + current + ' aria-haspopup="true">' + item.label + CF.icon("chevron", 14) + "</a>" +
          '<div class="mega" role="region" aria-label="' + item.label + '">' +
            '<div class="mega-inner container">' +
              '<div class="mega-intro">' +
                '<p class="eyebrow">' + item.label + "</p>" +
                "<p class=\"mega-blurb\">" + item.blurb + "</p>" +
                '<a class="link-arrow" href="' + u(item.href) + '">Explore ' + item.label.toLowerCase() + " " + CF.icon("arrow", 16) + "</a>" +
              "</div>" +
              '<ul class="mega-links' + (item.links.length > 4 ? " is-two-col" : "") + '">' + links + "</ul>" +
              '<div class="mega-media' + (item.imgContain ? " is-contain" : "") + '"><img src="' + img(item.img) + '" alt="" loading="lazy"></div>' +
            "</div>" +
          "</div>" +
        "</li>"
      );
    }).join("");

    var mobile = NAV.map(function (item) {
      if (!item.links) {
        return '<li><a class="drawer-link" href="' + u(item.href) + '">' + item.label + "</a></li>";
      }
      return (
        "<li><details><summary class=\"drawer-link\">" + item.label + CF.icon("chevron", 18) + "</summary>" +
          '<ul class="drawer-sub"><li><a href="' + u(item.href) + '">' + item.label + " overview</a></li>" +
          item.links.map(function (l) { return '<li><a href="' + u(l.href) + '">' + l.label + "</a></li>"; }).join("") +
        "</ul></details></li>"
      );
    }).join("");

    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header" data-header>' +
        '<div class="topbar"><div class="container topbar-inner">' +
          '<p class="topbar-tag">' + brandBar + S.tagline + "</p>" +
          '<ul class="topbar-links">' +
            '<li><a href="tel:' + S.phoneIntl + '">' + CF.icon("phone", 14) + S.phone + "</a></li>" +
            '<li><a href="mailto:' + S.email + '">' + CF.icon("mail", 14) + S.email + "</a></li>" +
            '<li><a href="' + S.instagram + '" target="_blank" rel="noreferrer" aria-label="Instagram">' + CF.icon("instagram", 14) + "<span>Instagram</span></a></li>" +
            '<li><a href="' + S.tiktok + '" target="_blank" rel="noreferrer" aria-label="TikTok">' + CF.icon("tiktok", 14) + "<span>TikTok</span></a></li>" +
            '<li><a href="https://wa.me/' + S.whatsapp + '" target="_blank" rel="noreferrer" aria-label="WhatsApp">' + CF.icon("whatsapp", 14) + "<span>WhatsApp</span></a></li>" +
          "</ul>" +
        "</div></div>" +
        '<div class="mainbar"><div class="container mainbar-inner">' +
          '<a class="brand" href="' + u("") + '" aria-label="Classik Finishes home">' +
            '<img class="brand-dark" src="' + img("assets/img/logo.png") + '" alt="Classik Finishes" width="130" height="41">' +
            '<img class="brand-light" src="' + img("assets/img/logo-white.png") + '" alt="" width="130" height="41">' +
          "</a>" +
          '<nav class="primary-nav" aria-label="Main"><ul>' + desktop + "</ul></nav>" +
          '<div class="header-actions">' +
            '<a class="enquiry-pill" href="' + u("contact/#enquiry") + '" aria-label="Your enquiry list">' + CF.icon("list", 18) + '<span class="enquiry-pill-label">Enquiry</span><span class="enquiry-count" data-enquiry-count>0</span></a>' +
            '<a class="btn btn-primary btn-sm header-cta" href="' + u("contact/") + '">Get an estimate</a>' +
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer" data-menu-toggle>' +
              '<span class="menu-open">' + CF.icon("menu", 24) + '</span><span class="menu-close">' + CF.icon("close", 24) + '</span><span class="sr-only">Menu</span>' +
            "</button>" +
          "</div>" +
        "</div></div>" +
        '<div class="drawer" id="drawer" data-drawer hidden>' +
          '<ul class="drawer-nav">' + mobile + "</ul>" +
          '<div class="drawer-foot">' +
            '<a class="btn btn-primary btn-block" href="' + u("contact/") + '">Get an estimate ' + CF.icon("arrow", 16) + "</a>" +
            '<a class="btn btn-outline btn-block" href="https://wa.me/' + S.whatsapp + '" target="_blank" rel="noreferrer">' + CF.icon("whatsapp", 16) + " Chat on WhatsApp</a>" +
            '<p><a href="tel:' + S.phoneIntl + '">' + S.phone + '</a> · <a href="tel:' + S.phone2Intl + '">' + S.phone2 + "</a></p>" +
          "</div>" +
        "</div>" +
      "</header>"
    );
  }

  function footer() {
    var col = function (title, links) {
      return '<div class="footer-col"><h2 class="footer-title">' + title + "</h2><ul>" +
        links.map(function (l) { return '<li><a href="' + u(l.href) + '">' + l.label + "</a></li>"; }).join("") +
        "</ul></div>";
    };
    var byId = function (id) { return NAV.filter(function (n) { return n.id === id; })[0]; };
    var year = new Date().getFullYear();

    return (
      '<footer class="site-footer">' +
        '<div class="footer-cta"><div class="container footer-cta-inner">' +
          "<div>" +
            '<p class="eyebrow eyebrow-light">Start a project</p>' +
            '<p class="footer-cta-title">Have a space that needs finishing?</p>' +
            "<p class=\"footer-cta-copy\">Tell us about the job and we'll follow up with next steps and a site visit.</p>" +
          "</div>" +
          '<div class="footer-cta-actions">' +
            '<a class="btn btn-light" href="' + u("contact/") + '">Get an estimate ' + CF.icon("arrow", 16) + "</a>" +
            '<a class="btn btn-outline-light" href="https://wa.me/' + S.whatsapp + '" target="_blank" rel="noreferrer">' + CF.icon("whatsapp", 16) + " WhatsApp us</a>" +
          "</div>" +
        "</div></div>" +
        '<div class="footer-main"><div class="container footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="' + u("") + '"><img src="' + img("assets/img/logo-white.png") + '" alt="Classik Finishes" width="150" height="47"></a>' +
            '<p class="footer-tag">' + S.tagline + "</p>" +
            "<p>From overheads to walls and surfaces to details, we deliver quality finishing solutions for homes, estates and commercial spaces across " + S.serviceArea + ".</p>" +
            '<ul class="social">' +
              '<li><a href="' + S.instagram + '" target="_blank" rel="noreferrer" aria-label="Instagram">' + CF.icon("instagram", 18) + "</a></li>" +
              '<li><a href="' + S.tiktok + '" target="_blank" rel="noreferrer" aria-label="TikTok">' + CF.icon("tiktok", 18) + "</a></li>" +
              '<li><a href="https://wa.me/' + S.whatsapp + '" target="_blank" rel="noreferrer" aria-label="WhatsApp">' + CF.icon("whatsapp", 18) + "</a></li>" +
              '<li><a href="tel:' + S.phoneIntl + '" aria-label="Call">' + CF.icon("phone", 18) + "</a></li>" +
              '<li><a href="mailto:' + S.email + '" aria-label="Email">' + CF.icon("mail", 18) + "</a></li>" +
            "</ul>" +
          "</div>" +
          col("Company", [{ label: "Home", href: "" }, { label: "What we do", href: "#what-we-do" }, { label: "How we work", href: "#how-we-work" }, { label: "Projects", href: "projects/" }, { label: "Testimonials", href: "testimonials/" }, { label: "Contact", href: "contact/" }]) +
          col("Offerings", byId("offerings").links) +
          col("Products", CF.products.slice(0, 5).map(function (p) { return { label: p.name, href: "products/#" + p.id }; }).concat([{ label: "All products", href: "products/" }])) +
          '<div class="footer-col footer-contact"><h2 class="footer-title">Get in touch</h2><ul>' +
            '<li><a href="tel:' + S.phoneIntl + '">' + CF.icon("phone", 16) + S.phone + "</a></li>" +
            '<li><a href="tel:' + S.phone2Intl + '">' + CF.icon("phone", 16) + S.phone2 + "</a></li>" +
            '<li><a href="mailto:' + S.email + '">' + CF.icon("mail", 16) + S.email + "</a></li>" +
            '<li><a href="' + S.instagram + '" target="_blank" rel="noreferrer">' + CF.icon("instagram", 16) + S.instagramHandle + "</a></li>" +
            '<li><a href="' + S.tiktok + '" target="_blank" rel="noreferrer">' + CF.icon("tiktok", 16) + S.tiktokHandle + " on TikTok</a></li>" +
            "<li><span>" + CF.icon("pin", 16) + "Serving clients across " + S.serviceArea + "</span></li>" +
          "</ul></div>" +
        "</div></div>" +
        '<div class="footer-bottom"><div class="container footer-bottom-inner">' +
          "<p>© " + year + " " + S.legalName + ". All rights reserved.</p>" +
          "<p>Licensed &amp; insured · " + S.serviceArea + "</p>" +
          '<a class="to-top" href="#top">Back to top ' + CF.icon("arrowUp", 14) + "</a>" +
        "</div></div>" +
        brandBar.replace('class="brandbar"', 'class="brandbar brandbar-footer"') +
      "</footer>"
    );
  }

  if (part === "header") script.insertAdjacentHTML("beforebegin", header());
  if (part === "footer") script.insertAdjacentHTML("beforebegin", footer());
})();
