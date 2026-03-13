/* ============================================================
   Ananda Reiki Healing Center — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Mobile Menu Toggle ── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 2. Scroll-based Navbar Shadow / Background ── */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  /* ── 3. Intersection Observer — Fade-up Animations ── */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up, .fade-in').forEach((el) => {
    fadeObserver.observe(el);
  });

  /* ── 4. Active Nav Link Highlighting ── */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link');

    allNavLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      const isHome = (href === 'index.html' || href === '') && (currentPath === 'index.html' || currentPath === '');
      if (href === currentPath || isHome) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  /* ── 5. Booking / Contact Form Validation ── */
  function initForm(formId, successId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const successMsg = document.getElementById(successId);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach((el) => {
        el.style.display = 'none';
      });
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((el) => {
        el.style.borderColor = '';
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e05c5c';
          const errEl = field.parentElement.querySelector('.form-error');
          if (errEl) errEl.style.display = 'block';
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          valid = false;
          emailField.style.borderColor = '#e05c5c';
          const errEl = emailField.parentElement.querySelector('.form-error');
          if (errEl) {
            errEl.textContent = 'Please enter a valid email address.';
            errEl.style.display = 'block';
          }
        }
      }

      // Phone validation (basic)
      const phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value.trim()) {
        const phoneRe = /^[\d\s\-\+\(\)]{7,15}$/;
        if (!phoneRe.test(phoneField.value.trim())) {
          valid = false;
          phoneField.style.borderColor = '#e05c5c';
          const errEl = phoneField.parentElement.querySelector('.form-error');
          if (errEl) {
            errEl.textContent = 'Please enter a valid phone number.';
            errEl.style.display = 'block';
          }
        }
      }

      if (valid) {
        // Simulate submission
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending…';
          submitBtn.disabled = true;

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();

            if (successMsg) {
              successMsg.style.display = 'block';
              successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
            }
          }, 1400);
        }
      }
    });

    // Real-time clear errors on input
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        const errEl = field.parentElement.querySelector('.form-error');
        if (errEl) errEl.style.display = 'none';
      });
    });
  }

  initForm('bookingForm', 'bookingSuccess');
  initForm('contactForm', 'contactSuccess');

  /* ── 6. Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 7. Counter Animation for Stats ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = prefix + value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('.counter').forEach((el) => {
    counterObserver.observe(el);
  });

  /* ── 8. FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach((fi) => fi.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 9. Ripple Effect on Buttons ── */
  document.querySelectorAll('.btn-primary, .btn-outline').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:6px;height:6px;border-radius:50%;
        background:rgba(255,255,255,0.5);
        top:${e.clientY - rect.top - 3}px;
        left:${e.clientX - rect.left - 3}px;
        transform:scale(0);
        animation:ripple 0.6s linear;
        pointer-events:none;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Inject ripple keyframe once
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = '@keyframes ripple{to{transform:scale(30);opacity:0}}';
    document.head.appendChild(style);
  }

})();
