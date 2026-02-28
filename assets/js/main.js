/* ============================================================
   ROGÉRIO BEZERRA — Main JavaScript
   Scroll Reveal · Navbar Scroll · Mobile Menu
   ============================================================ */

(function () {
  'use strict';

  // --- Scroll Reveal (Intersection Observer) ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // --- Navbar Scroll Effect ---
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        toggle.classList.remove('active');
        links.classList.remove('open');
      }
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // --- Active Nav Link Highlight ---
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // --- Gateway: Add Entrance Animation ---
  function initGatewayEntrance() {
    const gateway = document.getElementById('gateway');
    if (!gateway) return;

    const sides = gateway.querySelectorAll('.gateway-side-content');
    
    // Stagger entrance
    setTimeout(() => {
      sides.forEach((side, i) => {
        setTimeout(() => {
          side.style.opacity = '1';
          side.style.transform = 'translateY(0)';
        }, i * 200);
      });
    }, 300);

    // Set initial state
    sides.forEach((side) => {
      side.style.opacity = '0';
      side.style.transform = 'translateY(24px)';
      side.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }

  // --- Init All ---
  function init() {
    initScrollReveal();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLink();
    initGatewayEntrance();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
