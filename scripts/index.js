gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll(
    ".scroll-animate, .scroll-animate-side, .scroll-fade, .scroll-scale-fade"
  );

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectsContainer = document.querySelector('.projects-container');
  const projects = document.querySelectorAll('.project');
  const currentSectionTitle = document.getElementById('current-section');
  const themeToggle = document.getElementById('theme-toggle');

  // Close hamburger menu when clicking on a nav link
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapse && navbarToggler) {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close the menu if it's open
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // Close hamburger menu when clicking outside
  if (navbarCollapse && navbarToggler) {
    document.addEventListener('click', (event) => {
      const isClickInsideNav = navbarCollapse.contains(event.target);
      const isClickOnToggler = navbarToggler.contains(event.target);
      
      // If menu is open and click is outside nav and toggler, close it
      if (navbarCollapse.classList.contains('show') && !isClickInsideNav && !isClickOnToggler) {
        navbarToggler.click();
      }
    });
  }



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


  // Map button data-section to display text
  const sectionTitles = {
    'all': 'All Projects',
    'web': 'Web Development',
    'databases': 'Databases',
    'programming': 'Programming',
    'multithreading': 'Multithreading',
    'ai': 'AI & Machine Learning',
    'testing': 'Testing',
    'design': 'UI/UX Design'
  };

  // Function to get priority for a project based on current section
  function getProjectPriority(project, section) {
    const priorityData = project.getAttribute('data-priority');
    if (!priorityData) return 999; // Default high number for projects without priority

    const priorities = priorityData.split(',');
    for (const priority of priorities) {
      const [key, value] = priority.split(':');
      if (key === section) {
        return parseInt(value);
      }
    }

    // If no specific priority for this section, check for "all" as fallback
    for (const priority of priorities) {
      const [key, value] = priority.split(':');
      if (key === 'all') {
        return parseInt(value);
      }
    }

    return 999;
  }

  // Function to reorder projects based on priority
  function reorderProjects(section) {
    const visibleProjects = Array.from(projects).filter(project => {
      const projectSections = project.getAttribute('data-section').split(' ');
      return section === 'all' || projectSections.includes(section);
    });

    // Sort projects by their priority for the current section
    visibleProjects.sort((a, b) => {
      const priorityA = getProjectPriority(a, section);
      const priorityB = getProjectPriority(b, section);
      return priorityA - priorityB;
    });

    // Get the extra wrapper (it stays outside projects-container as a sibling to the checkbox)
    const extraWrapper = document.querySelector('.extra-wrapper');
    const extraInner = extraWrapper ? extraWrapper.querySelector('.extra') : null;

    // Remove all projects from container
    projectsContainer.innerHTML = '';

    // Add section title
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-title visible';
    sectionTitle.id = 'current-section';
    sectionTitle.textContent = sectionTitles[section];
    projectsContainer.appendChild(sectionTitle);

    // For "all" section, separate regular and extra projects
    if (section === 'all') {
      const regularProjects = [];
      const extraProjects = [];
      
      visibleProjects.forEach(project => {
        const priority = getProjectPriority(project, section);
        if (priority < 5) {
          regularProjects.push(project);
        } else {
          extraProjects.push(project);
        }
      });

      // Add regular projects to projects-container
      regularProjects.forEach(project => {
        projectsContainer.appendChild(project);
        setTimeout(() => {
          project.classList.add('fade-in-up');
        }, 100);
      });

      // Add extra projects to the extra container (which stays outside projects-container)
      if (extraInner && extraProjects.length > 0) {
        extraInner.innerHTML = '';
        
        extraProjects.forEach(project => {
          extraInner.appendChild(project);
          setTimeout(() => {
            project.classList.add('fade-in-up');
          }, 100);
        });
      } else if (extraInner) {
        // Clear extra container if no extra projects
        extraInner.innerHTML = '';
      }
    } else {
      // For other sections, just add all visible projects normally
      visibleProjects.forEach(project => {
        projectsContainer.appendChild(project);
        setTimeout(() => {
          project.classList.add('fade-in-up');
        }, 100);
      });
      
      // Clear extra container when in filtered view
      if (extraInner) {
        extraInner.innerHTML = '';
      }
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const section = button.getAttribute('data-section');

      // Animate the button click
      button.classList.add('animate');
      setTimeout(() => {
        button.classList.remove('animate');
      }, 500);

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // First hide all projects
      projects.forEach(project => {
        const projectSections = project.getAttribute('data-section').split(' ');
        if (section === 'all' || projectSections.includes(section)) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });

      // Then reorder the visible projects
      reorderProjects(section);
      
      // Update the read more button visibility
      updateReadMoreState(section);
    });
  });

  // Initialize with all projects in correct order
  reorderProjects('all');




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




  const boxes = document.querySelectorAll('.box');
  const readMoreCheckbox = document.querySelector('#btn');
  const readMoreLabel = document.querySelector('.show-more-toggle');

  // Remember the "Read More" state between section switches
  let isReadMoreChecked = false;

  // ====== FUNCTION: UPDATE READ MORE STATE ======
  function updateReadMoreState(section) {
    const container = document.querySelector('.show-more-container');
    const labelText = document.querySelector('.show-more-text');
    const checkbox = document.querySelector('#btn');
    
    if (section === 'all') {
      // Show toggle button again and sync with saved state
      if (container) {
        container.style.display = 'flex';
      }
      if (labelText) {
        labelText.textContent = isReadMoreChecked ? 'Show less' : 'Show more';
      }
      if (checkbox) {
        checkbox.style.display = 'none';
        checkbox.checked = isReadMoreChecked;
      }
    } else {
      // Hide toggle in filtered views
      if (container) {
        container.style.display = 'none';
      }
      if (checkbox) {
        checkbox.style.display = 'none';
      }
    }
  }


  // ====== EVENT: READ MORE TOGGLE ======
  if (readMoreCheckbox && readMoreLabel) {
    readMoreCheckbox.addEventListener('change', () => {
      isReadMoreChecked = readMoreCheckbox.checked;

      const labelText = document.querySelector('.show-more-text');
      if (labelText) {
        if (isReadMoreChecked) {
          labelText.textContent = 'Show less';
        } else {
          labelText.textContent = 'Show more';
        }
      }
    });
  }

  // Initialize the read more button state
  updateReadMoreState('all');


  // ====== FORM VALIDATION & SUBMISSION ======
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      event.stopPropagation();

      // Check form validity
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        
        // Show browser validation messages
        contactForm.reportValidity();
        
        // Also show custom error message
        formStatus.innerHTML = '<p class="error-message">✗ Please fill in all required fields correctly.</p>';
        formStatus.style.display = 'block';
        
        // Focus on first invalid field
        const firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
        
        return;
      }

      // Form is valid - submit via fetch
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      // Show loading state
      formStatus.innerHTML = '<p class="loading">Sending message...</p>';
      formStatus.style.display = 'block';

      // Disable submit button
      const submitButton = contactForm.querySelector('#send-message');
      submitButton.disabled = true;
      submitButton.value = 'Sending...';

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: json,
        });

        const result = await response.json();

        if (response.status === 200) {
          // Success
          formStatus.innerHTML = '<p class="success-message">✓ Message sent successfully! I\'ll get back to you soon.</p>';
          contactForm.reset();
          contactForm.classList.remove('was-validated');
        } else {
          // Error from API
          formStatus.innerHTML = `<p class="error-message">✗ ${result.message || 'Something went wrong. Please try again.'}</p>`;
        }
      } catch (error) {
        // Network error
        console.error('Form submission error:', error);
        formStatus.innerHTML = '<p class="error-message">✗ Network error. Please check your connection and try again.</p>';
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.value = 'Send Message';

        // Auto-hide message after 8 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }
    });

    // Real-time validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (contactForm.classList.contains('was-validated')) {
          this.checkValidity();
        }
      });
    });
  }

});