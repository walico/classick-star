/**
 * Classic Star Home Maintenance - Scroll reveal & animations
 */
(function () {
  'use strict';

  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var staggerParents = document.querySelectorAll('.reveal-stagger');

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var margin = windowHeight * 0.12;
      return rect.top < windowHeight - margin && rect.bottom > margin;
    }

    function show(el) {
      el.classList.add('revealed');
    }

    function checkReveals() {
      reveals.forEach(function (el) {
        if (isInViewport(el)) show(el);
      });
      staggerParents.forEach(function (el) {
        if (isInViewport(el)) show(el);
      });
    }

    window.addEventListener('scroll', function () {
      requestAnimationFrame(checkReveals);
    });
    window.addEventListener('resize', function () {
      requestAnimationFrame(checkReveals);
    });
    checkReveals();
  }

  function init() {
    revealOnScroll();
    // Reveal above-the-fold elements after a short delay
    setTimeout(function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) el.classList.add('revealed');
      });
      document.querySelectorAll('.reveal-stagger').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) el.classList.add('revealed');
      });
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
