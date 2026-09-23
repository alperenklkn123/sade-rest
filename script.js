(() => {
  'use strict';

  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const loader = $('.loader');

  const hideLoader = () => {
    if (loader) loader.classList.add('is-gone');
    document.body.classList.remove('is-loading');
  };

  // Absolute failsafe: the page can never stay blocked by the loader.
  window.setTimeout(hideLoader, 3600);

  const nav = $('#site-nav');
  // The primary navigation is always visible in the fixed top bar.
  const closeMenu = () => {};


  let lenis = null;

  try {
    if (!reduceMotion && window.Lenis) {
      lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }

    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        if (lenis) lenis.scrollTo(target, { duration: 1.15 });
        else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    if (!reduceMotion && window.gsap) {
      const gsap = window.gsap;
      if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

      document.body.classList.add('is-loading');
      const tl = gsap.timeline({ defaults:{ease:'power3.out'}, onComplete:hideLoader });
      tl.to('.loader__line i',{x:0,duration:.65})
        .to('.loader__inner > span',{y:-8,opacity:0,duration:.3},'+=.05')
        .to('.loader',{yPercent:-105,duration:.7,ease:'power4.inOut'})
        .from('.hero__title span',{yPercent:120,rotate:5,opacity:0,stagger:.06,duration:.85},'-=.25')
        .from('.hero__sub,.hero__eyebrow,.hero__bottom',{y:18,opacity:0,stagger:.06,duration:.55},'-=.5');

      if (window.ScrollTrigger) {
        if (lenis) lenis.on('scroll', window.ScrollTrigger.update);

        $$('.reveal').forEach(el => gsap.from(el,{y:30,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
        $$('.image-reveal').forEach(el => gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.15,ease:'power4.inOut',scrollTrigger:{trigger:el,start:'top 82%',once:true}}));
        $$('.statement__title .line').forEach((line,i) => gsap.from(line,{xPercent:i%2===0?-7:7,opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:line,start:'top 88%',once:true}}));
        $$('.parallax-media img').forEach(img => {
          const section=img.closest('section');
          gsap.fromTo(img,{yPercent:-4,scale:1.03},{yPercent:4,scale:1.07,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:true}});
        });
        $$('.gallery-card img').forEach(img => gsap.fromTo(img,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:img.closest('.gallery-card'),start:'top bottom',end:'bottom top',scrub:true}}));
        window.ScrollTrigger.refresh();
      }

      if (finePointer) {
        $$('.magnetic').forEach(button => {
          button.addEventListener('mousemove', e => {
            const r=button.getBoundingClientRect();
            gsap.to(button,{x:(e.clientX-r.left-r.width/2)*.16,y:(e.clientY-r.top-r.height/2)*.16,duration:.25,ease:'power2.out'});
          });
          button.addEventListener('mouseleave',()=>gsap.to(button,{x:0,y:0,duration:.45,ease:'elastic.out(1,.45)'}));
        });
      }
    } else {
      hideLoader();
      $$('.image-reveal').forEach(el => el.style.clipPath='none');
    }
  } catch (err) {
    console.warn('Animation fallback enabled:', err);
    hideLoader();
    $$('.image-reveal').forEach(el => el.style.clipPath='none');
  }

  // Menu items intentionally stay text-only on hover.

})();
