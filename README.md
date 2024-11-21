# Responsive Portfolio Website

This repository contains a responsive portfolio website designed and implemented as part of the **Web Design 2 (MKGB63)** course at Karlstad University. The website serves as both a personal portfolio to showcase projects and a platform to highlight student life and hobbies.

## Key Features

### Design and Layout
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices using a **mobile-first** approach.
- **Custom Animations**: Smooth animations, including `fade-in`, `slide-in`, and `scale-up`, enhance user engagement.
- **Dark Mode Compatibility**: Adapts to system-level dark mode settings for a seamless viewing experience.
- **Clean Aesthetic**: Minimalist design with rounded corners, modern typography, and consistent padding.

### Interactivity
- **Offcanvas Navigation**: Mobile-friendly menu with a toggle button for better accessibility.
- **Dynamic Section Updates**: Uses the `Intersection Observer API` to animate sections as they come into view.
- **Project Highlights**: Each project includes animated descriptions, image previews, and gradient-highlighted links.

## Technology Stack
- **HTML5**: For semantic structure and accessibility.
- **CSS3**: Custom styling with media queries and CSS variables for consistency.
- **JavaScript (ES6)**: Interactive components, scroll animations, and dynamic section detection.
- **Bootstrap**: Utilized grid and components for responsive layout design.

## Folder Structure

```plaintext
├── index.html       # Main HTML file
├── /css             # Contains all CSS files
│   ├── global.css       # Global styles
│   ├── navigation.css   # Navigation-specific styles
│   ├── sections.css     # Section-specific styles
│   ├── media.css        # Media queries and responsive adjustments
│   ├── footer.css       # Footer-specific styles
│   ├── scrollbar.css    # Scrollbar customization
│   ├── preloader.css    # Preloader styling
│   ├── projects.css     # Project-specific styles
│   ├── carousel.css     # Carousel adjustments
│   └── styles.css       # General styles and overrides
├── /js              # JavaScript files
│   └── script.js        # Main script for interactivity
├── /images          # Image assets
├── /fonts           # Custom fonts (if applicable)
