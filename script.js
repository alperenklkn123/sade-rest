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
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');

  const syncNav = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 24);
  syncNav();
  window.addEventListener('scroll', syncNav, {passive:true});

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    nav?.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    mobileMenu?.classList.toggle('is-open', opening);
    mobileMenu?.setAttribute('aria-hidden', String(!opening));
    nav?.classList.toggle('menu-active', opening);
    document.body.classList.toggle('menu-open', opening);
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

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

  // Desktop-only menu image preview. It is optional and never blocks navigation.
  const preview = $('.menu-preview');
  const previewImg = preview?.querySelector('img');
  if (finePointer && preview && previewImg) {
    let active=false;
    const move = e => {
      if (!active) return;
      if (window.gsap) window.gsap.to(preview,{x:e.clientX,y:e.clientY,duration:.35,ease:'power3.out'});
      else { preview.style.left=e.clientX+'px'; preview.style.top=e.clientY+'px'; }
    };
    window.addEventListener('mousemove', move, {passive:true});

    $$('.menu-item').forEach(item => {
      const show = () => {
        active=true;
        const src=item.dataset.image;
        previewImg.onerror=()=>{ previewImg.onerror=null; previewImg.src='assets/images/fallback-food.svg'; };
        if (src) previewImg.src=src;
        if (window.gsap) window.gsap.to(preview,{opacity:1,scale:1,rotate:2,duration:.3,ease:'power3.out'});
        else preview.style.opacity='1';
      };
      const hide = () => {
        active=false;
        if (window.gsap) window.gsap.to(preview,{opacity:0,scale:.84,rotate:-4,duration:.25,ease:'power3.in'});
        else preview.style.opacity='0';
      };
      item.addEventListener('mouseenter',show);
      item.addEventListener('mouseleave',hide);
      item.addEventListener('focus',show);
      item.addEventListener('blur',hide);
    });
  }
})();
