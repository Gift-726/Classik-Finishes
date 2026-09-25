/* Classik Finishes — page behaviour. Loaded with `defer` on every page, after data.js and layout.js. */
(function () {
  var CF = window.CF;
  var S = CF.site;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var asset = function (p) { return CF.root + encodeURI(p); };
  var fmt = function (n) { return "₦" + n.toLocaleString("en-NG"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- Opened from disk: make folder links point at index.html ---------- */
  if (location.protocol === "file:") {
    $$("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(h)) return;
      a.setAttribute("href", h.replace(/(^|\/)(#|$)/, "$1index.html$2").replace(/^index\.html#/, "#"));
    });
  }

  /* ---------- Enquiry list (shared across pages via localStorage) ---------- */
  var KEY = "cf-enquiry-v1";
  var catalog = {};
  CF.services.forEach(function (s) {
    var g = CF.serviceGroups.filter(function (x) { return x.id === s.group; })[0];
    catalog[s.id] = { id: s.id, kind: "service", name: s.name, price: s.price, group: g.name, color: g.color };
  });
  CF.products.forEach(function (p) {
    catalog[p.id] = { id: p.id, kind: "product", name: p.name, price: p.price, group: "Product · " + p.size, color: "#BB5AD7", size: p.size };
  });

  function readStore() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter(function (id) { return catalog[id]; }) : []; }
    catch (e) { return memoryStore; }
  }
  var memoryStore = [];
  function writeStore(ids) {
    memoryStore = ids;
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) { /* private mode: keep in memory */ }
    syncEnquiryUI();
  }
  CF.enquiry = {
    ids: readStore,
    items: function () { return readStore().map(function (id) { return catalog[id]; }); },
    has: function (id) { return readStore().indexOf(id) > -1; },
    toggle: function (id) {
      var ids = readStore();
      var i = ids.indexOf(id);
      if (i > -1) ids.splice(i, 1); else ids.push(id);
      writeStore(ids);
      return i === -1;
    },
    remove: function (id) { writeStore(readStore().filter(function (x) { return x !== id; })); },
    clear: function () { writeStore([]); }
  };
  window.addEventListener("storage", function (e) { if (e.key === KEY) syncEnquiryUI(); });

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2400);
  }

  function addButton(id) {
    return '<button type="button" class="add-btn" data-add="' + id + '" aria-pressed="false">' +
      '<span data-add-label>Add to enquiry</span>' +
      '<span class="icon-plus">' + CF.icon("plus", 16) + '</span><span class="icon-check">' + CF.icon("check", 16) + "</span></button>";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add]");
    if (!btn) return;
    var id = btn.getAttribute("data-add");
    var added = CF.enquiry.toggle(id);
    toast(added ? catalog[id].name + " added to your enquiry" : catalog[id].name + " removed");
    var pill = $(".enquiry-pill");
    if (pill && added) { pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump"); }
  });

  var enquiryBar;
  function syncEnquiryUI() {
    var ids = readStore();
    $$("[data-enquiry-count]").forEach(function (el) { el.textContent = ids.length; });
    $$(".enquiry-pill").forEach(function (el) {
      el.classList.toggle("has-items", ids.length > 0);
      el.setAttribute("aria-label", "Your enquiry list, " + ids.length + " item" + (ids.length === 1 ? "" : "s"));
    });
    $$("[data-add]").forEach(function (b) {
      var on = ids.indexOf(b.getAttribute("data-add")) > -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var label = $("[data-add-label]", b);
      if (label) label.textContent = on ? "Added to enquiry" : "Add to enquiry";
      var card = b.closest(".rate-card, .product-card");
      if (card) card.classList.toggle("is-selected", on);
    });
    if (enquiryBar) {
      enquiryBar.classList.toggle("is-visible", ids.length > 0);
      $("[data-bar-count]", enquiryBar).textContent = ids.length + " item" + (ids.length === 1 ? "" : "s");
    }
    renderEnquiryList();
  }

  /* ---------- Renderers (driven by data-render attributes in each page) ---------- */
  function renderStats(el) {
    el.innerHTML = S.stats.map(function (s) {
      return '<div class="stat"><p class="stat-value" style="color:' + s.color + '">' + s.value + '</p><p class="stat-label">' + s.label + "</p></div>";
    }).join("");
  }

  function rateCard(s, i, color) {
    return '<article class="rate-card" style="--c:' + color + '" id="rate-' + s.id + '">' +
      '<span class="rate-card-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
      "<h3>" + s.name + "</h3>" +
      '<p class="rate-card-note">' + s.note + "</p>" +
      "<div>" +
        '<p class="rate-unit">' + (s.price === null ? "Priced after site visit" : "Per sqm, from") + "</p>" +
        '<p class="rate-amount">' + (s.price === null ? "On request" : fmt(s.price)) + "</p>" +
        addButton(s.id) +
      "</div></article>";
  }

  function renderRateGroups(el) {
    el.innerHTML = CF.serviceGroups.map(function (g) {
      var list = CF.services.filter(function (s) { return s.group === g.id; });
      return '<section class="rate-group" id="' + g.id + '" style="scroll-margin-top:calc(var(--mainbar-h) + 80px); margin-bottom:clamp(56px,6vw,88px)">' +
        '<div class="group-head"><span class="sw" style="background:' + g.color + '"></span><h2 class="h-3">' + g.name + "</h2><p>" + g.intro + "</p></div>" +
        '<div class="card-grid reveal-stagger">' + list.map(function (s, i) { return rateCard(s, i, g.color); }).join("") + "</div>" +
      "</section>";
    }).join("");
  }

  function renderRateTeaser(el) {
    var picks = ["paint", "screed", "tyrolean", "pop", "gypsum", "tiling"];
    el.innerHTML = picks.map(function (id) {
      var s = CF.services.filter(function (x) { return x.id === id; })[0];
      var g = CF.serviceGroups.filter(function (x) { return x.id === s.group; })[0];
      return '<li><span class="sw" style="background:' + g.color + '"></span>' +
        '<span><span class="rate-group">' + g.name + '</span><span class="rate-name">' + s.name + "</span></span>" +
        '<span class="rate-price"><small>per sqm, from</small>' + fmt(s.price) + "</span></li>";
    }).join("");
  }

  function productCard(p) {
    var cat = CF.productCategories.filter(function (c) { return c.id === p.category; })[0];
    return '<article class="product-card" id="' + p.id + '" data-category="' + p.category + '">' +
      '<div class="product-media"><span class="product-size">' + p.size + '</span><img src="' + asset(p.img) + '" alt="' + esc(p.name) + ' tin" loading="lazy"></div>' +
      '<div class="product-body">' +
        '<p class="product-cat">' + cat.name + "</p>" +
        "<h3>" + p.name + "</h3>" +
        '<p class="muted">' + p.note + "</p>" +
        '<p class="product-price">' + (p.price === null ? "Price on request" : fmt(p.price)) + "</p>" +
        addButton(p.id) +
      "</div></article>";
  }

  function renderProducts(el) {
    el.innerHTML = CF.products.map(productCard).join("");
  }

  function renderProductFilters(el) {
    var grid = $(el.getAttribute("data-target"));
    var cats = [{ id: "all", name: "All products" }].concat(CF.productCategories);
    el.innerHTML = cats.map(function (c, i) {
      var n = c.id === "all" ? CF.products.length : CF.products.filter(function (p) { return p.category === c.id; }).length;
      return '<button type="button" class="chip" data-filter="' + c.id + '" aria-pressed="' + (i === 0) + '">' + c.name + '<span class="chip-count">' + n + "</span></button>";
    }).join("");
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      $$(".chip", el).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      $$(".product-card", grid).forEach(function (card) {
        card.hidden = f !== "all" && card.getAttribute("data-category") !== f;
        card.style.display = card.hidden ? "none" : "";
      });
    });
  }

  function tile(p, i, extra) {
    var media = p.type === "video"
      ? '<video src="' + asset(p.src) + '" poster="' + asset(p.poster) + '" muted loop playsinline preload="none" data-hover-video></video><span class="tile-play">' + CF.icon("play", 12) + " Video</span>"
      : '<img src="' + asset(p.src) + '" alt="' + esc(p.title) + '" loading="lazy">';
    return '<button type="button" class="tile ' + (extra || "") + '" data-lightbox="' + i + '" data-tags="' + p.tags.join(" ") + '" aria-label="Open ' + esc(p.title) + '">' +
      media + '<span class="tile-cap"><strong>' + esc(p.title) + "</strong><span>" + esc(p.note) + "</span></span></button>";
  }

  function renderProjects(el) {
    var variant = el.getAttribute("data-variant");
    if (variant === "home") {
      el.innerHTML = CF.projects.map(function (p, i) { return p.featured ? tile(p, i) : ""; }).join("");
    } else {
      var layout = ["is-wide is-tall", "", "", "is-tall", "", "", "is-wide", "", "is-tall", "", "is-wide", "", "is-wide", "", "is-wide", "", "", "is-wide"];
      el.innerHTML = CF.projects.map(function (p, i) { return tile(p, i, layout[i] || ""); }).join("");
    }
    // Videos preview on hover (desktop) — they don't all play at once.
    $$("[data-hover-video]", el).forEach(function (v) {
      var t = v.closest(".tile");
      t.addEventListener("mouseenter", function () { v.play().catch(function () {}); });
      t.addEventListener("mouseleave", function () { v.pause(); });
    });
  }

  function renderProjectFilters(el) {
    var grid = $(el.getAttribute("data-target"));
    el.innerHTML = CF.projectFilters.map(function (f, i) {
      var n = f.id === "all" ? CF.projects.length : CF.projects.filter(function (p) { return p.tags.indexOf(f.id) > -1; }).length;
      return '<button type="button" class="chip" data-filter="' + f.id + '" aria-pressed="' + (i === 0) + '">' + f.name + '<span class="chip-count">' + n + "</span></button>";
    }).join("");
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      $$(".chip", el).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      $$(".tile", grid).forEach(function (t) {
        var show = f === "all" || t.getAttribute("data-tags").split(" ").indexOf(f) > -1;
        t.hidden = !show;
        // Irregular spans only make sense on the full, unfiltered grid.
        t.classList.toggle("is-plain", f !== "all");
      });
      grid.classList.toggle("is-filtered", f !== "all");
    });
  }

  function renderCapList(el) {
    el.innerHTML = el.getAttribute("data-ids").split(",").map(function (id) {
      var s = CF.services.filter(function (x) { return x.id === id; })[0];
      if (!s) return "";
      return "<li><strong>" + s.name + "</strong><span>" + s.note + "</span><em>" +
        (s.price === null ? "<small>Priced</small>On request" : "<small>From</small>" + fmt(s.price) + "/sqm") + "</em></li>";
    }).join("");
  }

  /* Testimonials stay hidden until CF.testimonials has entries. */
  function renderTestimonials(el) {
    var list = (CF.testimonials || []).filter(function (t) { return t && t.quote; });
    el.hidden = !list.length;
    if (!list.length) return;
    var colors = ["#8FC706", "#32C0F0", "#E01E83"];
    $("[data-testimonial-list]", el).innerHTML = list.map(function (t, i) {
      return '<figure class="quote-block quote-card" style="--c:' + colors[i % colors.length] + '"><blockquote>' + esc(t.quote) + "</blockquote>" +
        "<figcaption><strong>" + esc(t.name || "") + "</strong>" +
        ((t.position || t.company) ? "<span>" + esc([t.position, t.company].filter(Boolean).join(", ")) + "</span>" : "") + "</figcaption></figure>";
    }).join("");
  }

  var renderers = {
    "stats": renderStats,
    "testimonials": renderTestimonials,
    "cap-list": renderCapList,
    "rate-groups": renderRateGroups,
    "rate-teaser": renderRateTeaser,
    "products": renderProducts,
    "product-filters": renderProductFilters,
    "projects": renderProjects,
    "project-filters": renderProjectFilters
  };
  $$("[data-render]").forEach(function (el) {
    var fn = renderers[el.getAttribute("data-render")];
    if (fn) fn(el);
  });

  /* ---------- Header: transparent-to-solid, mega menus, mobile drawer ---------- */
  var header = $("[data-header]");
  var hasHero = document.body.classList.contains("has-hero");
  function onScroll() {
    if (!header || !hasHero) return;
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 40 || header.matches(":hover") || header.classList.contains("menu-open") || header.contains(document.activeElement) && document.activeElement !== document.body);
    header.classList.toggle("is-scrolled", y > 40);
  }
  if (header && hasHero) {
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("mouseenter", onScroll);
    header.addEventListener("mouseleave", function () { setTimeout(onScroll, 10); });
    header.addEventListener("focusin", onScroll);
    header.addEventListener("focusout", function () { setTimeout(onScroll, 10); });
    onScroll();
  }

  $$(".nav-item.has-mega").forEach(function (item) {
    // After a click inside a panel, hide it until the pointer leaves, so it doesn't hang open over the new section.
    item.addEventListener("click", function (e) { if (e.target.closest(".mega a")) item.classList.add("is-closed"); });
    item.addEventListener("mouseleave", function () { item.classList.remove("is-closed"); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { item.classList.add("is-closed"); $(".nav-link", item).focus(); }
    });
    item.addEventListener("focusin", function () { item.classList.remove("is-closed"); });
  });

  var toggle = $("[data-menu-toggle]");
  var drawer = $("[data-drawer]");
  function setDrawer(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.hidden = !open;
    document.body.classList.toggle("drawer-open", open);
    if (header) header.classList.toggle("menu-open", open);
    onScroll();
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setDrawer(toggle.getAttribute("aria-expanded") !== "true"); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setDrawer(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });
    window.matchMedia("(min-width: 1081px)").addEventListener("change", function (m) { if (m.matches) setDrawer(false); });
  }

  /* Floating "review your enquiry" bar on pages with add buttons */
  if ($("[data-add]") && document.body.getAttribute("data-page") !== "contact") {
    enquiryBar = document.createElement("div");
    enquiryBar.className = "enquiry-bar";
    enquiryBar.innerHTML = '<p><strong data-bar-count>0 items</strong> <span>in your enquiry</span></p>' +
      '<a class="btn btn-primary" href="' + CF.url("contact/#enquiry") + '">Review &amp; send ' + CF.icon("arrow", 16) + "</a>";
    document.body.appendChild(enquiryBar);
  }

  /* ---------- Home hero slider ----------
     Each slide has a background video; a slide stays up for the length of its video, then moves on. */
  var hero = $("[data-hero]");
  if (hero) {
    var slides = $$(".hero-slide", hero);
    var tabs = $$(".hero-tab", hero);
    var FALLBACK = 8000;
    var idx = 0, timer = null, paused = false;
    var videoOf = function (i) { return $("video", slides[i]); };
    var durationOf = function (i) {
      var v = videoOf(i);
      return v && isFinite(v.duration) && v.duration > 1 ? Math.round(v.duration * 1000) : FALLBACK;
    };

    slides.forEach(function (s, i) {
      var v = videoOf(i);
      if (!v) return;
      v.muted = true;
      v.loop = true; // keeps moving if the slider is paused
      // Once the real length is known, re-time the slide that is showing.
      v.addEventListener("loadedmetadata", function () { if (i === idx) schedule(); });
    });

    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === idx;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
        $$("a, button", s).forEach(function (a) { a.tabIndex = on ? 0 : -1; });
        var v = videoOf(i);
        if (!v) return;
        if (on && !reduceMotion) {
          if (v.preload !== "auto") v.preload = "auto";
          try { v.currentTime = 0; } catch (e) {}
          v.play().catch(function () {});
        } else {
          v.pause();
        }
      });
      // Warm up the next slide's video so the cross-fade isn't to a blank frame.
      var next = videoOf((idx + 1) % slides.length);
      if (next && next.preload !== "auto") next.preload = "auto";
      tabs.forEach(function (t, i) {
        t.classList.toggle("is-active", i === idx);
        t.setAttribute("aria-current", i === idx ? "true" : "false");
        var bar = $(".hero-tab-bar i", t);
        if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
      });
      schedule();
    };
    var schedule = function () {
      clearTimeout(timer);
      var playing = !paused && !reduceMotion;
      var ms = durationOf(idx);
      hero.style.setProperty("--hero-interval", ms + "ms");
      hero.classList.toggle("is-playing", playing);
      if (playing) timer = setTimeout(function () { go(idx + 1); }, ms);
    };
    var setPaused = function (p) { paused = p; schedule(); };
    tabs.forEach(function (t, i) { t.addEventListener("click", function () { go(i); }); });
    $("[data-hero-prev]", hero).addEventListener("click", function () { go(idx - 1); });
    $("[data-hero-next]", hero).addEventListener("click", function () { go(idx + 1); });
    // Pause only while the visitor is using the controls or keyboard-focused inside the hero.
    var controls = $(".hero-controls", hero);
    controls.addEventListener("mouseenter", function () { setPaused(true); });
    controls.addEventListener("mouseleave", function () { setPaused(false); });
    hero.addEventListener("focusin", function (e) { if (e.target.matches(":focus-visible")) setPaused(true); });
    hero.addEventListener("focusout", function () { setPaused(false); });
    document.addEventListener("visibilitychange", function () { setPaused(document.hidden); });

    // Swipe on touch screens
    var sx = null;
    hero.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
    go(0);
  }

  /* ---------- Horizontal scroller arrows ---------- */
  $$("[data-scroll-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sc = $(btn.getAttribute("data-scroll-target"));
      var card = sc.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 20 : 300;
      sc.scrollBy({ left: step * Number(btn.getAttribute("data-dir")), behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------- Lightbox for project tiles ---------- */
  var lb, lbIndex = 0, lbList = [];
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Project viewer");
    lb.innerHTML =
      '<div class="lightbox-top"><span data-lb-count></span><button type="button" class="lb-btn" data-lb-close aria-label="Close">' + CF.icon("close", 22) + "</button></div>" +
      '<div class="lightbox-stage">' +
        '<button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="Previous">' + CF.icon("arrowLeft", 22) + "</button>" +
        '<img data-lb-img alt="">' +
        '<video data-lb-video controls playsinline loop></video>' +
        '<button type="button" class="lb-btn lb-next" data-lb-next aria-label="Next">' + CF.icon("arrow", 22) + "</button>" +
      "</div>" +
      '<div class="lightbox-cap"><strong data-lb-title></strong><span data-lb-note></span></div>';
    document.body.appendChild(lb);
    $("[data-lb-close]", lb).addEventListener("click", closeLightbox);
    $("[data-lb-prev]", lb).addEventListener("click", function () { showLightbox(lbIndex - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { showLightbox(lbIndex + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox-stage")) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
      if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
    });
  }
  var lastFocus;
  function showLightbox(n) {
    lbIndex = (n + lbList.length) % lbList.length;
    var p = CF.projects[lbList[lbIndex]];
    var im = $("[data-lb-img]", lb), vid = $("[data-lb-video]", lb);
    if (p.type === "video") {
      im.style.display = "none"; im.removeAttribute("src");
      vid.style.display = ""; vid.poster = asset(p.poster); vid.src = asset(p.src); vid.muted = true;
      vid.play().catch(function () {});
    } else {
      vid.pause(); vid.removeAttribute("src"); vid.load(); vid.style.display = "none";
      im.style.display = ""; im.src = asset(p.src); im.alt = p.title;
    }
    $("[data-lb-title]", lb).textContent = p.title;
    $("[data-lb-note]", lb).textContent = p.note;
    $("[data-lb-count]", lb).textContent = String(lbIndex + 1).padStart(2, "0") + " / " + String(lbList.length).padStart(2, "0");
  }
  function closeLightbox() {
    var vid = $("[data-lb-video]", lb);
    vid.pause();
    lb.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lightbox]");
    if (!t) return;
    if (!lb) buildLightbox();
    var grid = t.parentElement;
    lbList = $$("[data-lightbox]", grid).filter(function (x) { return !x.hidden; }).map(function (x) { return Number(x.getAttribute("data-lightbox")); });
    lastFocus = t;
    lb.hidden = false;
    document.body.classList.add("lightbox-open");
    showLightbox(lbList.indexOf(Number(t.getAttribute("data-lightbox"))));
    $("[data-lb-close]", lb).focus();
  });

  /* ---------- Sticky subnav: highlight the section in view ---------- */
  var subnav = $("[data-subnav]");
  if (subnav && "IntersectionObserver" in window) {
    var links = $$("a[href*='#']", subnav);
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute("href").split("#")[1]); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href").split("#")[1] === en.target.id;
          a.classList.toggle("is-active", on);
          if (on && a.scrollIntoView && subnav.scrollWidth > subnav.clientWidth) a.parentElement.parentElement.scrollLeft = a.offsetLeft - 20;
        });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- Contact page: enquiry list + form ---------- */
  var listEl = $("[data-enquiry-list]");
  function renderEnquiryList() {
    if (!listEl) return;
    var items = CF.enquiry.items();
    var services = items.filter(function (i) { return i.kind === "service"; });
    var body;
    if (!items.length) {
      body = '<p class="enquiry-empty">Nothing added yet. Pick services from <a href="' + CF.url("offerings/") + '">Offerings</a> or paints from <a href="' + CF.url("products/") + '">Products</a>, or just describe the job below.</p>';
    } else {
      body = '<ul class="enquiry-items">' + items.map(function (i) {
        return '<li><span class="sw" style="background:' + i.color + '"></span><span><strong>' + i.name + "</strong><small>" + i.group + "</small></span>" +
          '<span class="price">' + (i.price === null ? "On request" : fmt(i.price) + (i.kind === "service" ? "/sqm" : "")) + "</span>" +
          '<button type="button" data-remove="' + i.id + '" aria-label="Remove ' + esc(i.name) + '">' + CF.icon("trash", 15) + "</button></li>";
      }).join("") + "</ul>";
    }
    var priced = services.filter(function (s) { return s.price !== null; });
    var rate = priced.reduce(function (a, s) { return a + s.price; }, 0);
    var areaEl = $("#f-area");
    var area = areaEl ? parseFloat(String(areaEl.value).replace(/[^0-9.]/g, "")) : NaN;
    var estimate = "";
    if (services.length) {
      var onReq = services.length !== priced.length;
      estimate = '<div class="estimate">' +
        "<div><small>Combined rate</small><strong>" + (rate ? fmt(rate) + "/sqm" : "—") + "</strong></div>" +
        "<div><small>Indicative total</small><strong>" + (rate && area > 0 ? fmt(Math.round(rate * area)) : "Add area") + "</strong></div>" +
        '<div class="estimate-note">' + (onReq ? "Items marked on request are quoted after a site visit and aren't included. " : "") + "A guide only. The final price is confirmed after a site measure.</div>" +
      "</div>";
    }
    listEl.innerHTML = '<div class="enquiry-list-head"><span>Your enquiry (' + items.length + ")</span>" + (items.length ? '<button type="button" data-clear>Clear all</button>' : "") + "</div>" + body + estimate;
    var areaField = $("[data-area-field]");
    if (areaField) areaField.hidden = !services.length;
  }
  if (listEl) {
    listEl.addEventListener("click", function (e) {
      var r = e.target.closest("[data-remove]");
      if (r) CF.enquiry.remove(r.getAttribute("data-remove"));
      if (e.target.closest("[data-clear]")) CF.enquiry.clear();
    });
    var areaInput = $("#f-area");
    if (areaInput) areaInput.addEventListener("input", renderEnquiryList);
  }

  var form = $("[data-contact-form]");
  if (form) {
    var fields = ["name", "reach", "type", "area", "message"];
    var val = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ""; };
    var validate = function () {
      var ok = true;
      ["name", "reach"].forEach(function (n) {
        var f = form.elements[n].closest(".field");
        var bad = !val(n);
        f.classList.toggle("has-error", bad);
        if (bad) ok = false;
      });
      if (!ok) { var first = $(".has-error .input", form); if (first) first.focus(); }
      return ok;
    };
    var compose = function () {
      var items = CF.enquiry.items();
      var lines = ["Hello Classik Finishes, I'd like to enquire about a project.", ""];
      lines.push("Name: " + val("name"));
      lines.push("Contact: " + val("reach"));
      if (val("type")) lines.push("Project type: " + val("type"));
      if (items.length) {
        lines.push("", "Enquiry list:");
        items.forEach(function (i) { lines.push("- " + i.name + " (" + (i.price === null ? "on request" : fmt(i.price) + (i.kind === "service" ? "/sqm" : "")) + ")"); });
      }
      if (val("area")) lines.push("", "Area to cover: " + val("area") + " sqm");
      if (val("message")) lines.push("", "Message: " + val("message"));
      return lines.join("\n");
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var via = (e.submitter && e.submitter.value) || "whatsapp";
      var text = compose();
      var url = via === "email"
        ? "mailto:" + S.email + "?subject=" + encodeURIComponent("Project enquiry — " + val("name")) + "&body=" + encodeURIComponent(text)
        : "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(text);
      if (via === "email") location.href = url; else window.open(url, "_blank", "noopener");
      $("[data-form-status]", form).textContent = via === "email"
        ? "Your email app should open with the enquiry filled in. Press send there."
        : "WhatsApp should open in a new tab with your enquiry filled in. Press send there.";
    });
    fields.forEach(function (n) {
      var el = form.elements[n];
      if (el) el.addEventListener("input", function () { el.closest(".field").classList.remove("has-error"); });
    });
    // Pre-select a project type from ?type= links
    var qp = new URLSearchParams(location.search).get("type");
    if (qp && form.elements.type) form.elements.type.value = qp;
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  syncEnquiryUI();
})();
