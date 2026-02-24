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

  function setupAccordion() {
    var accordionItems = document.querySelectorAll('.accordion-item');
    var servicesImage = document.getElementById('services-image');

    if (!accordionItems.length || !servicesImage) return;

    accordionItems.forEach(function (item) {
      var summary = item.querySelector('summary');
      if (!summary) return;

      summary.addEventListener('click', function (e) {
        // Prevent default details toggle behavior temporarily
        e.preventDefault();

        // Close all other accordion items
        accordionItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.removeAttribute('open');
          }
        });

        // Toggle current item
        if (item.hasAttribute('open')) {
          item.removeAttribute('open');
        } else {
          item.setAttribute('open', 'open');
        }

        // Update the image if this item is now open
        if (item.hasAttribute('open')) {
          var imageUrl = item.getAttribute('data-image');
          if (imageUrl && servicesImage) {
            servicesImage.src = imageUrl;
          }
        }
      });

      // Also listen to the native toggle event for when details opens/closes
      item.addEventListener('toggle', function () {
        if (item.hasAttribute('open')) {
          var imageUrl = item.getAttribute('data-image');
          if (imageUrl && servicesImage) {
            servicesImage.src = imageUrl;
          }
        }
      });
    });
  }

  function init() {
    revealOnScroll();
    setupAccordion();
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
