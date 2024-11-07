'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionTitle = document.getElementById('sectionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const offcanvasMenu = document.getElementById('offcanvasNavbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Preloader removal on page load
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Updates section information displayed in the section title,
     * highlights the active link in the navbar, and updates section indicators.
     */
    function updateSectionInfo() {
        let currentSection = '';
        
        // Identifies the currently viewed section based on scroll position
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                currentSection = section.getAttribute('id');
                updateIndicators(index);
                updateNavLinks(currentSection);
            }
        });

        // Maps the section ID to a display name
        const sectionNames = {
            'about-me': 'ABOUT ME',
            'projects': 'PROJECTS',
            'leisure-and-hobbies': 'Leisure & Hobbies',
            'student-memories': 'Student Memories'
        };
        
        const newTitle = sectionNames[currentSection] || '';
        
        // Only update the title if it has changed
        if (sectionTitle.textContent !== newTitle) {
            const tempTitle = document.createElement('span');
            tempTitle.textContent = newTitle;
            tempTitle.classList.add('flip');

            sectionTitle.innerHTML = ''; // Clear existing content
            sectionTitle.appendChild(tempTitle);

            tempTitle.addEventListener('animationend', () => {
                sectionTitle.textContent = newTitle;
            });
        }
    }

    /**
     * Adds 'filled' class to the indicator of the currently active section.
     */
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('filled', index === activeIndex);
        });
    }

    /**
     * Highlights the navigation link for the current section.
     */
    function updateNavLinks(currentSection) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').includes(currentSection);
            link.classList.toggle('active-link', isActive);
        });
    }

    // Toggle indicator visibility based on offcanvas menu state
    offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
        indicators.forEach(indicator => indicator.style.display = 'none');
    });

    offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
        indicators.forEach(indicator => indicator.style.display = 'block');
    });

    /**
     * Observer to trigger animations on scroll for elements with 'fade-in', 'scale-up',
     * 'slide-in-left', and 'slide-in-right' classes.
     */
    const faders = document.querySelectorAll('.fade-in, .scale-up, .slide-in-left, .slide-in-right');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Initiate section info updates on scroll
    window.addEventListener('scroll', updateSectionInfo);
    updateSectionInfo(); // Initial call to set the correct state on load
});