# Personal Portfolio Website

## Overview

This is a personal portfolio website for a frontend developer named Adelina. The site showcases skills, projects, and professional experiences through a multi-page static website. It's built as a client-side only application with no backend services, hosted on GitHub Pages. The portfolio features an interactive UI with scroll animations, theme switching capabilities, and project filtering functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with no frontend frameworks
- The application follows a traditional multi-page architecture with separate HTML files (index.html, about.html)
- Bootstrap 5.3.3 is used for responsive grid layout and UI components
- Custom CSS files (style.css, about.css) provide themed styling with CSS custom properties for theme switching
- JavaScript modules handle specific functionality: scroll animations (about.js, index.js), footer updates (footer.js)

**Design Patterns**:
- CSS Custom Properties (CSS Variables) enable dynamic theme switching between light and dark modes
- The theme system uses a comprehensive set of color tokens (--bg-primary, --text-primary, etc.) that get swapped via a `data-theme` attribute
- Scroll-based animations use intersection observer patterns to trigger reveals and fades
- Filter functionality for project showcase uses class-based toggling

**Animation System**:
- GSAP (GreenSock Animation Platform) with ScrollTrigger plugin powers advanced scroll-based animations
- Typed.js library provides typewriter text effects
- Custom scroll animation classes (.scroll-animate, .scroll-fade, .scroll-scale-fade) trigger at different viewport positions
- CSS custom property `--reveal-progress` enables progressive reveal effects on scroll

**Responsive Design**:
- Mobile-first approach with viewport meta tags disabling user scaling
- Bootstrap's responsive grid system handles layout breakpoints
- Custom media queries in CSS files adjust layouts for different screen sizes
- Mobile navigation (hamburger menu) with auto-close behavior:
  - Menu closes when a navigation link is clicked
  - Menu closes when clicking outside the menu area
  - Enhanced visibility in dark mode with white icon (85% opacity)

### Development Environment

**Local Development Server**: Python HTTP server (server.py)
- Simple HTTP server running on port 5000
- Serves static files from the project root directory
- Implements cache-busting headers to prevent stale content during development
- No build process or compilation required - files are served directly

**Rationale**: A Python-based development server was chosen for its simplicity and zero-configuration setup, avoiding the need for Node.js tooling for a static site.

### Styling Architecture

**CSS Organization**:
- Separate stylesheets for different pages (style.css for index, about.css for about page)
- Global styles use the Geologica font family from Google Fonts
- Color theming implemented through CSS custom properties with fallbacks
- Custom button hover effects and gradient backgrounds

**Theme System**:
- Dual theme support (light/dark) using CSS custom properties
- Theme toggle stored in data attributes on the document root
- Gradient backgrounds and accent colors adapt to theme selection
- Shadow and border colors adjust for visual consistency across themes

### Static Asset Management

**External Resources**:
- Google Fonts (Geologica family) loaded via CDN
- Bootstrap 5.3.3 CSS and JS from CDN
- Font Awesome 6.0 icons from CDN
- Boxicons 2.1.4 from CDN
- GSAP and Typed.js from CDN

**Images**: 
- Profile pictures and project screenshots stored in /images directory
- Images set with `-webkit-user-drag: none` to prevent dragging

**Rationale**: CDN-hosted libraries reduce bundle size, improve load times through browser caching, and eliminate the need for a build process or package management.

## External Dependencies

### Third-Party Libraries (CDN-hosted)

1. **Bootstrap 5.3.3** - UI component framework and responsive grid system
2. **Font Awesome 6.0** - Icon library for UI elements
3. **Boxicons 2.1.4** - Additional icon set
4. **GSAP 3.12.2 with ScrollTrigger** - Advanced animation library for scroll-based effects
5. **Typed.js 2.1.0** - Typewriter effect library
6. **Google Fonts (Geologica)** - Custom web font

### Hosting Platform

**GitHub Pages** - Static site hosting
- Site deployed at: https://tabbytadi.github.io/My-Portfolio/
- No server-side rendering or backend processing
- Direct file serving from repository

### Development Tools

**VS Code** - Primary IDE with Live Server extension (port 5501 configured)
- Local development server configuration in .vscode/settings.json

### No Database Layer

This is a purely static website with no database integration. All content is hardcoded in HTML files or managed through JavaScript DOM manipulation. There is no data persistence layer, user authentication, or server-side data processing.