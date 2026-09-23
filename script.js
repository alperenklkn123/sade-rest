(() => {
  const body = document.body;
  const loader = document.querySelector(".page-loader");
  const shell = document.querySelector(".site-shell");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  body.classList.add("is-loading");

  // Fail-safe: never allow the loader to trap the page.
  const hideLoader = () => {
    loader?.classList.add("is-hidden");
    body.classList.remove("is-loading");
  };
  const loaderFailsafe = window.setTimeout(hideLoader, 3200);

  window.addEventListener("load", () => {
    if (!window.gsap || reduceMotion) {
      hideLoader();
      clearTimeout(loaderFailsafe);
      return;
    }

    gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        hideLoader();
        clearTimeout(loaderFailsafe);
      }
    })
    .to(".page-loader__line span", { x: 0, duration: .75 })
    .to(".page-loader__mark", { y: -10, opacity: 0, duration: .35 }, "+=.05")
    .to(".page-loader", { yPercent: -100, duration: .75, ease: "power4.inOut" })
    .from(".hero__title span", {
      yPercent: 115, opacity: 0, rotate: 5,
      stagger: .065, duration: .95
    }, "-=.25")
    .from(".hero-reveal", {
      y: 18, opacity: 0, stagger: .08, duration: .7
    }, "-=.55");
  }, { once: true });

  const updateNav = () => {
    shell?.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  // Native smooth anchor scrolling. Keeps the site functional even if CDN scripts fail.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  // Desktop-only magnetic buttons.
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches && window.gsap && !reduceMotion) {
    document.querySelectorAll(".magnetic").forEach(button => {
      button.addEventListener("mousemove", e => {
        const r = button.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(button, { x: x * .14, y: y * .14, duration: .25, ease: "power2.out" });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { x: 0, y: 0, duration: .45, ease: "elastic.out(1,.45)" });
      });
    });
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
    document.querySelectorAll(".reveal,.media-reveal").forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.clipPath = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
      y: 34,
      opacity: 0,
      duration: .95,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".media-reveal").forEach(el => {
    gsap.to(el, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.15,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".manifesto-line").forEach((line, i) => {
    gsap.from(line, {
      xPercent: i % 2 === 0 ? -7 : 7,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: line,
        start: "top 88%"
      }
    });
  });

  // Gentle image parallax only. No cursor-following photos.
  gsap.utils.toArray(".hero__media img,.reservation__media img").forEach(img => {
    const parent = img.parentElement.parentElement;
    gsap.fromTo(img,
      { yPercent: -4, scale: 1.02 },
      {
        yPercent: 4,
        scale: 1.07,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  gsap.utils.toArray(".intro__image img,.dish-card__image img,.gallery-card img").forEach(img => {
    gsap.fromTo(img,
      { yPercent: -3 },
      {
        yPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: .5
        }
      }
    );
  });
})();
