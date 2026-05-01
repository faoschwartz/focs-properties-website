'use strict';

// ---- Nav: scroll shadow + active link highlighting -------------------------
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 4);
  }, { passive: true });

  // Highlight active nav link based on scroll position
  const sections = ['thesis', 'approach', 'section8', 'investors', 'team', 'contact'];
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// ---- Mobile nav toggle -----------------------------------------------------
(function () {
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', function () {
    const open = mobile.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    mobile.setAttribute('aria-hidden', !open);
  });

  // Close mobile nav when a link is clicked
  mobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobile.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
    });
  });
})();

// ---- Scroll-reveal observer ------------------------------------------------
(function () {
  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ---- Investor inquiry form -------------------------------------------------
(function () {
  const form = document.getElementById('investor-form');
  const confirm = document.getElementById('form-confirm');
  if (!form || !confirm) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic client-side validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        field.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        field.style.borderColor = '';
        field.removeAttribute('aria-invalid');
      }
    });

    if (!valid) {
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    // In production: POST form data to your endpoint here.
    // For now, show the confirmation card.
    form.style.display = 'none';
    confirm.style.display = 'block';
    confirm.focus();
  });

  // Clear error styling on input
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      this.style.borderColor = '';
      this.removeAttribute('aria-invalid');
    });
  });
})();

// ---- Smooth scroll for anchor links ----------------------------------------
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
