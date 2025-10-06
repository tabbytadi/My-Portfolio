gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll(
    ".scroll-animate, .scroll-animate-side, .scroll-fade, .scroll-scale-fade"
  );

  const themeToggle = document.getElementById('theme-toggle');



  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
      (percentageScroll / 100)
    );
  };

  const elementRevealProgress = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementHeight = el.offsetHeight;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const revealStart = viewportHeight - elementTop;
    const progress = Math.min(1, Math.max(0, revealStart / elementHeight));
    return progress;
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        el.classList.add("in-view");

        if (el.classList.contains("scroll-fade")) {
          const progress = elementRevealProgress(el) * 100;
          el.style.setProperty("--reveal-progress", `${100 - progress}%`);
        }
      } else {
        el.classList.remove("in-view");
      }
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();

  // Typed.js for text animation
  const typed = new Typed('.multipleText', {
    strings: ['Frontend Developer', 'Comp Science Student'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });


  // Blurry navbar on scroll
  window.addEventListener('scroll', function () {
    const navbarStick = document.querySelector('.navbarSticky');
    if (window.scrollY > 0) {
      navbarStick.classList.add('scrolled');
    } else {
      navbarStick.classList.remove('scrolled');
    }
  });


  // Set active nav link on scroll
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
  const dropdownToggles = document.querySelectorAll('.navbar .nav-item.dropdown .toggle');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const dropdownMenu = toggle.nextElementSibling;
      const arrow = toggle.querySelector('.arrow');

      dropdownMenu.classList.toggle('show');
      arrow.classList.toggle('rotate');
    });
  });


  // Light Dark Theme toggle functionality
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleText(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
  }

  function updateToggleText(theme) {
    themeToggle.textContent = theme === 'light' ? '' : '';
  }

  themeToggle.addEventListener('click', toggleTheme);
  initTheme();



  gsap.to(".image-figure--1 img", {
    scrollTrigger: {
      trigger: ".images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    },
    y: 100,
    rotate: 15,
    duration: 1
  });

  gsap.to(".image-figure--1", {
    scrollTrigger: {
      trigger: ".images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    },
    y: -100,
    rotate: -15,
    duration: 1
  });

  gsap.to(".image-figure--2 img", {
    scrollTrigger: {
      trigger: ".images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    },
    y: -120,
    rotate: -18,
    duration: 1
  });

  gsap.to(".image-figure--2", {
    scrollTrigger: {
      trigger: ".images-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5
    },
    y: 120,
    rotate: 8,
    duration: 1
  });



});