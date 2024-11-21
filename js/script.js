'use strict';

// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select relevant DOM elements
    const sections = document.querySelectorAll('section'); // All sections on the page
    const sectionTitle = document.getElementById('sectionTitle'); // The dynamic section title element
    const indicators = document.querySelectorAll('.indicator'); // Scroll position indicators
    const offcanvasMenu = document.getElementById('offcanvasNavbar'); // Offcanvas menu element
    const navLinks = document.querySelectorAll('.nav-link'); // Navigation links

    // Preloader: Remove the preloader element once the page has fully loaded
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove(); // Remove the preloader from the DOM
        });
    }

    /**
     * Updates the current section information:
     * - Displays the correct section title in the header
     * - Highlights the active navigation link
     * - Updates the active scroll indicator
     */
    function updateSectionInfo() {
        let currentSection = ''; // Tracks the current section being viewed
        const scrollPosition = window.pageYOffset; // Get current scroll position

        // Loop through all sections to determine the current active section
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop; // Get the top position of the section
            if (scrollPosition >= sectionTop - 50) { // Check if the section is in view
                currentSection = section.getAttribute('id'); // Get the section's ID
                updateIndicators(index); // Highlight the corresponding scroll indicator
                updateNavLinks(currentSection); // Highlight the corresponding navigation link
            }
        });

        // Section titles mapped to display-friendly names
        const sectionNames = {
            'about-me': 'ABOUT ME',
            'projects': 'PROJECTS',
            'leisure-and-hobbies': 'Leisure & Hobbies',
            'student-memories': 'Student Memories',
        };

        const newTitle = sectionNames[currentSection] || ''; // Default to empty string if no match

        // Update the section title only if it has changed
        if (sectionTitle.textContent !== newTitle) {
            sectionTitle.classList.add('flip'); // Add animation class
            sectionTitle.addEventListener('animationend', () => {
                sectionTitle.textContent = newTitle; // Update the text content
                sectionTitle.classList.remove('flip'); // Remove animation class after it ends
            }, { once: true }); // Ensure the listener is removed after execution
        }
    }

    /**
     * Updates the scroll indicators to reflect the currently active section.
     * @param {number} activeIndex - Index of the active section
     */
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('filled', index === activeIndex); // Highlight the active indicator
            indicator.setAttribute('aria-hidden', index !== activeIndex); // Update accessibility attributes
        });
    }

    /**
     * Highlights the navigation link corresponding to the current section.
     * @param {string} currentSection - The ID of the current section
     */
    function updateNavLinks(currentSection) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').includes(currentSection); // Check if the link points to the current section
            link.classList.toggle('active-link', isActive); // Toggle the active-link class
        });
    }

    // Handle offcanvas menu events to toggle the visibility of scroll indicators
    if (offcanvasMenu) {
        offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
            indicators.forEach(indicator => indicator.style.display = 'none'); // Hide indicators when menu opens
        });

        offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
            indicators.forEach(indicator => indicator.style.display = 'block'); // Show indicators when menu closes
        });
    }

    /**
     * IntersectionObserver: Adds 'visible' class to elements as they come into view.
     * Targets elements with classes: fade-in, scale-up, slide-in-left, slide-in-right.
     */
    const faders = document.querySelectorAll('.fade-in, .scale-up, .slide-in-left, .slide-in-right'); // Elements to observe
    const appearOptions = {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Offset to trigger slightly earlier
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Skip if the element is not visible
            }
            entry.target.classList.add('visible'); // Add the visible class
            entry.target.style.opacity = '1'; // Ensure the element is visible
            observer.unobserve(entry.target); // Stop observing once visible
        });
    }, appearOptions);
    

    faders.forEach(fader => appearOnScroll.observe(fader)); // Attach the observer to each element

    // Throttle scroll events to optimize performance
    let isThrottled = false;
    window.addEventListener('scroll', () => {
        if (isThrottled) return; // Skip if throttling is active

        isThrottled = true;
        setTimeout(() => {
            updateSectionInfo(); // Update section info on scroll
            isThrottled = false; // Reset throttling
        }, 200); // Adjust the delay for smoother updates
    });

    updateSectionInfo(); // Initial call to set the correct state on page load
});