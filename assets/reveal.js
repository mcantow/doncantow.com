/* Motion reveal system, copied from michaelcantow.com (js/main.js: "Reveal on scroll",
   "Chapter spotlight", "Smooth scroll for nav anchors"). On the old Squarespace-built
   pages it also tags their content blocks so they reveal the same way. */
(function () {
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

  // Chapter spotlight: the section covering the viewport centre is lit, the rest recede.
  if (window.matchMedia('(min-width: 900px)').matches && !reduce) {
    const chapters = Array.from(document.querySelectorAll('body > section')).filter(el => el.offsetParent !== null);
    if (chapters.length > 1) {
      document.body.classList.add('chapters');
      let ticking = false, activeEl = null;
      const pick = () => {
        ticking = false;
        const mid = window.innerHeight / 2;
        let best = chapters[0], bestD = Infinity;
        for (const el of chapters) {
          const r = el.getBoundingClientRect();
          const d = r.top > mid ? r.top - mid : r.bottom < mid ? mid - r.bottom : 0;
          if (d < bestD) { bestD = d; best = el; }
        }
        if (best !== activeEl) {
          if (activeEl) activeEl.classList.remove('is-chapter-active');
          best.classList.add('is-chapter-active');
          activeEl = best;
        }
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(pick); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      pick();
    }
  }

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
