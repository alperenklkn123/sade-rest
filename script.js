gsap.registerPlugin(ScrollTrigger);

document.body.classList.add("is-loading");

const loaderTl = gsap.timeline({
  defaults: { ease: "power3.out" },
  onComplete: () => document.body.classList.remove("is-loading")
});

loaderTl
  .to(".loader__line i", { x: 0, duration: 0.9 })
  .to(".loader__inner > span", { y: -8, opacity: 0, duration: 0.4 }, "+=0.1")
  .to(".loader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
  .from(".hero__title span", {
    yPercent: 120,
    rotate: 6,
    opacity: 0,
    stagger: 0.07,
    duration: 1.0
  }, "-=0.25")
  .from(".hero__sub, .hero__eyebrow, .hero__bottom", {
    y: 18,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7
  }, "-=0.6");

// Smooth scroll
const lenis = new Lenis({
  duration: 1.15,
  smoothWheel: true,
  wheelMultiplier: 0.9
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Generic reveals
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.from(el, {
    y: 34,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      once: true
    }
  });
});

// Image clip reveals
gsap.utils.toArray(".image-reveal").forEach((el) => {
  gsap.to(el, {
    clipPath: "inset(0 0 0% 0)",
    duration: 1.25,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      once: true
    }
  });
});

// Statement lines
gsap.utils.toArray(".statement__title .line").forEach((line, index) => {
  gsap.from(line, {
    xPercent: index % 2 === 0 ? -8 : 8,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: line,
      start: "top 86%"
    }
  });
});

// Parallax
gsap.utils.toArray(".parallax-media img").forEach((img) => {
  const section = img.closest("section");

  gsap.fromTo(
    img,
    { yPercent: -6, scale: 1.03 },
    {
      yPercent: 6,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

gsap.utils.toArray(".gallery-card img").forEach((img) => {
  gsap.fromTo(
    img,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".gallery-card"),
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

// Menu preview
const preview = document.querySelector(".menu-preview");
const previewImg = preview.querySelector("img");
const menuItems = document.querySelectorAll(".menu-item");

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

window.addEventListener("mousemove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;

  gsap.to(preview, {
    x: pointerX,
    y: pointerY,
    duration: 0.45,
    ease: "power3.out"
  });
});

menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    previewImg.src = item.dataset.image;
    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      rotate: 2,
      duration: 0.35,
      ease: "power3.out"
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(preview, {
      opacity: 0,
      scale: 0.84,
      rotate: -4,
      duration: 0.3,
      ease: "power3.in"
    });
  });
});

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)"
    });
  });
});

// Anchor scrolling through Lenis
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
  });
});
