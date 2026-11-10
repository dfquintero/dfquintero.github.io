(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

(function () {
  'use strict';

  var track = document.getElementById('projects-track');
  if (!track) return;
  var items = Array.prototype.slice.call(track.children);
  if (!items.length) return;

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.carousel-btn'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var active = -1;

  function centerOf(item) {
    return item.offsetLeft + item.offsetWidth / 2;
  }

  function scrollToItem(index, smooth) {
    track.scrollTo({
      left: centerOf(items[index]) - track.clientWidth / 2,
      behavior: smooth && !reduceMotion ? 'smooth' : 'auto'
    });
  }

  function nearestIndex() {
    var center = track.scrollLeft + track.clientWidth / 2;
    var best = 0;
    var bestDistance = Infinity;
    items.forEach(function (item, i) {
      var distance = Math.abs(centerOf(item) - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  }

  function update() {
    var index = nearestIndex();
    if (index === active) return;
    active = index;
    items.forEach(function (item, i) {
      item.classList.toggle('is-active', i === index);
    });
    buttons.forEach(function (button) {
      var dir = Number(button.getAttribute('data-dir'));
      button.disabled = dir < 0 ? index === 0 : index === items.length - 1;
    });
  }

  var ticking = false;
  track.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      update();
    });
  }, { passive: true });

  buttons.forEach(function (button) {
    button.hidden = false;
    button.addEventListener('click', function () {
      var next = active + Number(button.getAttribute('data-dir'));
      scrollToItem(Math.max(0, Math.min(items.length - 1, next)), true);
    });
  });

  track.addEventListener('click', function (event) {
    var item = event.target.closest('.project');
    var index = items.indexOf(item);
    if (index !== -1 && index !== active) scrollToItem(index, true);
  });

  window.addEventListener('resize', function () {
    if (active !== -1) scrollToItem(active, false);
  });

  scrollToItem(Math.floor(Math.random() * items.length), false);
  update();
  track.classList.add('is-ready');
})();
