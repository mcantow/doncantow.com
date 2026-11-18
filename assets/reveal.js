/* Motion reveal system, copied from michaelcantow.com (js/main.js: "Reveal on scroll",
   "Chapter spotlight", "Smooth scroll for nav anchors"). On the old Squarespace-built
   pages it also tags their content blocks so they reveal the same way. */
(function () {
  // No jolt on reload (michaelcantow.com does the same).
  if ('scrollRestoration' in history) { try { history.scrollRestoration = 'manual'; } catch (e) {} }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Inner pages: give Squarespace content the same reveal paradigm.
  if (!document.querySelector('.reveal, .reveal-card, .reveal-left, .reveal-right')) {
    document.querySelectorAll('#content .sqs-block, .blog-list article, .blog-item-wrapper, #folderNav li')
      .forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('#folderNav ul, .blog-list').forEach(el => el.classList.add('reveal-stagger'));
  }

  // Auto-assign --i to children of .reveal-stagger parents so their CSS
  // transition-delay cascades naturally (no manual numbering needed).
  document.querySelectorAll('.reveal-stagger').forEach(parent => {
    let i = 0;
    Array.from(parent.children).forEach(child => {
      if (child.matches('.reveal, .reveal-card, .reveal-left, .reveal-right')) child.style.setProperty('--i', i++);
    });
  });

  const reveals = document.querySelectorAll('.reveal, .reveal-card, .reveal-left, .reveal-right, .reveal-line');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const useMobile = window.innerWidth < 1024 && entry.target.dataset.revealDelayMobile != null;
        const delay = parseInt((useMobile ? entry.target.dataset.revealDelayMobile : entry.target.dataset.revealDelay) || '0', 10);
        if (delay) setTimeout(() => entry.target.classList.add('is-visible'), delay);
        else entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -80px 0px' }); // threshold 0, not michaelcantow.com's 0.12: the quotes page has one block 140,000px tall that a ratio can never reach
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Nav: hide on scroll down, show on scroll up (michaelcantow.com).
  const nav = document.querySelector('nav.top') || document.getElementById('header');
  // Opening: the name and horizon drift away as you scroll the first screen,
  // driven directly by scroll position (like michaelcantow.com's hero fly-through).
  const heroInner = document.querySelector('.h4 .inner');
  const heroGlow = document.querySelector('.h4 .sky');
  let lastY = window.scrollY, ticking = false;
  const frame = () => {
    ticking = false;
    const y = window.scrollY;
    if (nav) nav.classList.toggle('hidden', y > lastY && y > 200);
    lastY = y;
    if (heroInner && !reduce) {
      const p = Math.min(1, Math.max(0, y / (window.innerHeight * 0.85)));
      const e = p * p;
      heroInner.style.transform = 'translateY(' + (-14 * e) + 'vh) scale(' + (1 + 0.1 * e) + ')';
      heroInner.style.opacity = Math.max(0, 1 - p * 1.25);
      if (heroGlow) heroGlow.style.opacity = Math.max(0, 1 - p * 0.9);
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', frame, { passive: true });
  frame();

  // Smooth scroll for in-page anchors.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
})();
