// ==================== SCROLL PROGRESS INDICATOR ====================
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ==================== GLASSMORPHIC STICKY NAVIGATION ====================
function initGlassmorphicNav() {
  const navbar = document.querySelector('.navbarSticky');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ==================== BUTTON RIPPLE EFFECT ====================
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn-hover');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== AUTO-UPDATE COPYRIGHT YEAR ====================
function updateCopyrightYear() {
  const yearElement = document.querySelector('.copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ==================== MINI CONTACT FORM ====================
function initMiniContactForm() {
  const form = document.querySelector('.mini-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    let successMsg = form.querySelector('.success-message');
    if (!successMsg) {
      successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = 'Thank you! Your message has been sent.';
      form.appendChild(successMsg);
    }
    
    successMsg.classList.add('show');
    
    // Reset form
    form.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);
  });
}

// ==================== LAZY LOADING IMAGES ====================
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => img.classList.add('loaded'));
  }
}

// ==================== GRADIENT TEXT HEADINGS ====================
function initGradientHeadings() {
  const headings = document.querySelectorAll('h1, h2.heading');
  headings.forEach(heading => {
    if (!heading.classList.contains('gradient-heading')) {
      heading.classList.add('gradient-heading');
    }
  });
}

// ==================== FLOATING ANIMATION ====================
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.home-img img');
  floatingElements.forEach(el => {
    el.classList.add('floating');
  });
}

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#home') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ==================== INITIALIZE ALL ENHANCEMENTS ====================
function initAllEnhancements() {
  initScrollProgress();
  initGlassmorphicNav();
  initRippleEffect();
  initBackToTop();
  updateCopyrightYear();
  initMiniContactForm();
  initLazyLoading();
  initGradientHeadings();
  initFloatingElements();
  initSmoothScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllEnhancements);
} else {
  initAllEnhancements();
}
