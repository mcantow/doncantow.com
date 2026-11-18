// Stand-in for the bits of Squarespace's scripts this site needs:
// the phone menu, its folders, and clicking a folder name in the desktop menu.
(function () {
  var base = document.currentScript.src.replace(/assets\/static-copy\.js.*$/, '');
  document.addEventListener('click', function (e) {
    if (e.target.closest('.mobile-nav-toggle')) { document.body.classList.toggle('mobile-nav-open'); return; }
    var f = e.target.closest('.folder-toggle');
    if (!f) return;
    if (f.closest('#mobileNavigation')) { f.classList.toggle('active'); return; }
    var h = f.getAttribute('data-href');
    if (h) location.href = h.charAt(0) === '/' ? base + h.slice(1) + '.html' : h;
  });
})();
