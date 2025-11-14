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

      // Add regular projects
      regularProjects.forEach(project => {
        projectsContainer.appendChild(project);
        setTimeout(() => {
          project.classList.add('fade-in-up');
        }, 100);
      });

      // Create extra wrapper if there are extra projects
      if (extraProjects.length > 0) {
        const extraWrapper = document.createElement('div');
        extraWrapper.className = 'extra';
        
        extraProjects.forEach(project => {
          extraWrapper.appendChild(project);
          setTimeout(() => {
            project.classList.add('fade-in-up');
          }, 100);
        });
        
        projectsContainer.appendChild(extraWrapper);
      }
    } else {
      // For other sections, just add all visible projects normally
      visibleProjects.forEach(project => {
        projectsContainer.appendChild(project);
        setTimeout(() => {
          project.classList.add('fade-in-up');
        }, 100);
      });
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
  const readMoreLabel = document.querySelector('label');

  // Remember the "Read More" state between section switches
  let isReadMoreChecked = false;

  // ====== FUNCTION: UPDATE READ MORE STATE ======
  function updateReadMoreState(section) {
    const extraContent = document.querySelector('.extra');
    
    if (section === 'all') {
      // Show toggle button again
      readMoreLabel.style.display = 'block';
      readMoreCheckbox.style.display = 'block';

      // Restore last checkbox state
      readMoreCheckbox.checked = isReadMoreChecked;

      if (extraContent) {
        if (readMoreCheckbox.checked) {
          extraContent.style.display = 'block';
          extraContent.classList.add('fade-in');
        } else {
          extraContent.style.display = 'none';
          extraContent.classList.remove('fade-in');
        }
      }
    } else {
      // Hide toggle in filtered views
      readMoreLabel.style.display = 'none';
      readMoreCheckbox.style.display = 'none';
    }
  }


  // ====== EVENT: READ MORE TOGGLE ======
  if (readMoreCheckbox) {
    readMoreCheckbox.addEventListener('change', () => {
      isReadMoreChecked = readMoreCheckbox.checked;
      const extraContent = document.querySelector('.extra');

      if (extraContent) {
        if (isReadMoreChecked) {
          extraContent.style.display = 'block';
          extraContent.classList.add('fade-in');
        } else {
          extraContent.style.display = 'none';
          extraContent.classList.remove('fade-in');
        }
      }
    });
  }


});