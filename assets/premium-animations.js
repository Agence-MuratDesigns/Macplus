/**
 * MACPLUS Premium Animations & UX Enhancements
 * Animations de reveal, transitions fluides et améliorations UX
 */

(function() {
  'use strict';

  // === INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionnel: arrêter d'observer après la révélation
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // === INITIALIZE REVEAL ANIMATIONS ===
  function initRevealAnimations() {
    // Sélectionner tous les éléments à animer
    const revealElements = document.querySelectorAll(`
      h1.h0, h1.h1, h2.h1, h2.h2, h2.h0,
      .section-header h2,
      .rich-text h2,
      .rich-text__heading,
      .image-with-text h2,
      .hero__heading,
      .banner__heading,
      .slideshow__text h2,
      .title-wrapper h2,
      .collection__title,
      .featured-collection__title,
      .rte p,
      .rich-text__text,
      .image-with-text__text,
      .text-with-icons__item,
      .multicolumn-card,
      .product-card-wrapper,
      .card-wrapper,
      .testimonial-card,
      .faq__accordion,
      .footer__block
    `);

    revealElements.forEach((el, index) => {
      // Ajouter un délai progressif pour les éléments du même groupe
      const parent = el.closest('section, .shopify-section');
      if (parent) {
        const siblings = parent.querySelectorAll(el.tagName + '.' + el.className.split(' ')[0]);
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.style.animationDelay = `${siblingIndex * 0.1}s`;
      }

      revealObserver.observe(el);
    });
  }

  // === SMOOTH HOVER EFFECTS FOR LINKS ===
  function initLinkHoverEffects() {
    // Footer links
    const footerLinks = document.querySelectorAll('.footer a, .footer__list-item a');
    footerLinks.forEach(link => {
      link.style.transition = 'color 0.3s ease, transform 0.3s ease';
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
      });
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });

    // Navigation links underline effect
    const navLinks = document.querySelectorAll('.header__menu-item > a');
    navLinks.forEach(link => {
      if (!link.querySelector('.nav-underline')) {
        const underline = document.createElement('span');
        underline.className = 'nav-underline';
        underline.style.cssText = `
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #D4D4D8 0%, #A1A1AA 50%, #D4D4D8 100%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        link.style.position = 'relative';
        link.appendChild(underline);

        link.addEventListener('mouseenter', () => {
          underline.style.width = '100%';
        });
        link.addEventListener('mouseleave', () => {
          underline.style.width = '0';
        });
      }
    });
  }

  // === PRODUCT CARD ENHANCEMENTS ===
  function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card, .card-wrapper, .product-card-wrapper');

    productCards.forEach(card => {
      // Add 3D tilt effect on hover
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // === SECTION TRANSITION EFFECTS ===
  function initSectionTransitions() {
    const sections = document.querySelectorAll('.shopify-section');

    sections.forEach(section => {
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  }

  // === SCROLL PROGRESS INDICATOR ===
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #C9C9C9 0%, #E8E8E8 50%, #C9C9C9 100%);
      z-index: 9999;
      transition: width 0.1s linear;
      box-shadow: 0 0 10px rgba(201, 201, 201, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // === BUTTON RIPPLE EFFECT ===
  function initButtonRipple() {
    const buttons = document.querySelectorAll('.button, button:not([type="submit"]), .btn');

    buttons.forEach(button => {
      button.style.overflow = 'hidden';
      button.style.position = 'relative';

      button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size/2}px;
          top: ${e.clientY - rect.top - size/2}px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleEffect {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // === IMAGE LAZY LOAD ENHANCEMENT ===
  function initImageLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';

      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', function() {
          this.style.opacity = '1';
        });
      }
    });
  }

  // === SMOOTH ANCHOR SCROLLING ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // === PARALLAX EFFECT FOR HERO SECTIONS ===
  function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.banner, .slideshow, .hero, .image-banner');

    if (parallaxElements.length && window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
          const rate = scrolled * -0.3;
          const img = el.querySelector('img, .banner__media, .slideshow__media');
          if (img) {
            img.style.transform = `translateY(${rate}px)`;
          }
        });
      }, { passive: true });
    }
  }

  // === ACCORDION SMOOTH ANIMATION ===
  function initAccordionAnimation() {
    const accordions = document.querySelectorAll('.accordion, details, .collapsible-content');

    accordions.forEach(accordion => {
      const content = accordion.querySelector('.accordion__content, summary + *');
      if (content) {
        content.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
      }
    });
  }

  // === CURSOR TRAIL EFFECT (subtle) ===
  function initCursorEffect() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(201, 201, 201, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, .product-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'rgba(201, 201, 201, 0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(201, 201, 201, 0.5)';
      });
    });
  }

  // === INITIALIZE ALL ===
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initRevealAnimations();
    initLinkHoverEffects();
    initSectionTransitions();
    initScrollProgress();
    initButtonRipple();
    initImageLazyLoad();
    initSmoothScroll();
    initParallaxEffect();
    initAccordionAnimation();
    // initCursorEffect(); // Uncomment for custom cursor
    // initProductCardEffects(); // Uncomment for 3D tilt effect

    console.log('Macplus Premium Animations initialized');
  }

  // Start
  init();

  // Reinitialize on Shopify section load (for theme editor)
  document.addEventListener('shopify:section:load', () => {
    setTimeout(initAll, 100);
  });

})();
