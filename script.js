(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---- Orchestrated hero load ---- */
  const reveal = () => document.body.classList.add("loaded");
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reveal);
    setTimeout(reveal, 600); // safety net
  } else {
    window.addEventListener("load", reveal);
  }

  /* ---- Condensing nav ---- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("condensed", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const navToggle = nav.querySelector(".nav-toggle");
    const mobileMenu = nav.querySelector(".mobile-menu");
    if (navToggle && mobileMenu) {
      const setMenu = (open) => {
        nav.classList.toggle("menu-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };

      navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("menu-open")));
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
      });
      document.addEventListener("click", (e) => {
        if (nav.classList.contains("menu-open") && !nav.contains(e.target)) setMenu(false);
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
      });
      window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 941px)").matches) setMenu(false);
      });
    }
  }

  /* ---- Scroll reveals ---- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    // Stagger grouped children (cards dealt one at a time)
    document.querySelectorAll(".stagger").forEach((group) => {
      [...group.children].forEach((child, i) => {
        if (child.classList.contains("reveal")) {
          child.style.transitionDelay = (i * 90) + "ms";
        }
      });
    });

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  /* ---- Count-up proof bar (only after scrolled into view) ---- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---- Word-swap misdirection (changes while attention is elsewhere) ---- */
  if (!reduceMotion) {
    document.querySelectorAll(".swap").forEach((el) => {
      const words = el.dataset.words.split(",");
      let i = 0;
      setInterval(() => {
        i = (i + 1) % words.length;
        el.style.opacity = "0";
        setTimeout(() => {
          el.textContent = words[i];
          el.style.opacity = "1";
        }, 600);
      }, 6500 + Math.random() * 2500);
    });
  }

  /* ---- Custom cursor ---- */
  if (fine && !reduceMotion) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    document.body.classList.add("cursor-on");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }
})();
