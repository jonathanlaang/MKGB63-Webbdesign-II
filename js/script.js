'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionTitle = document.getElementById('sectionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasMenu = document.getElementById('offcanvasNavbar');
    const preloader = document.querySelector('#preloader');
    let currentSection = ''; // Keeps track of the currently active section

    // Remove the preloader after the page has fully loaded
    if (preloader) {
        window.addEventListener('load', () => preloader.remove());
    }

    // Update the current section based on the scroll position
    function updateSectionInfo() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            // Check if the section is in the viewport (more than half is visible)
            if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                const newSection = section.getAttribute('id');
                // Only update if the section has changed
                if (currentSection !== newSection) {
                    currentSection = newSection;
                    updateSectionTitle(currentSection);
                    updateNavLinks(currentSection);
                    updateIndicators(index);
                }
            }
        });
    }

    // Update the section title displayed on the header
    function updateSectionTitle(newSection) {
        const sectionNames = {
            'about-me': 'ABOUT ME',
            'projects': 'PROJECTS',
            'leisure-and-hobbies': 'Leisure & Hobbies',
            'student-memories': 'Student Memories',
        };
        const newTitle = sectionNames[newSection] || '';
        // Update the section title only if it has changed
        if (sectionTitle.textContent !== newTitle) {
            sectionTitle.textContent = newTitle;
            sectionTitle.classList.add('flip');
            sectionTitle.addEventListener('animationend', () => {
                sectionTitle.classList.remove('flip');
            }, { once: true }); // Remove the event listener after it runs once
        }
    }

    // Update the navigation links to highlight the active section
    function updateNavLinks(currentSection) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').includes(currentSection);
            link.classList.toggle('active-link', isActive);
        });
    }

    // Update scroll indicators to highlight the active section
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('filled', index === activeIndex);
            indicator.setAttribute('aria-hidden', index !== activeIndex);
        });
    }

    // Handle visibility of the offcanvas menu (hide indicators while menu is open)
    if (offcanvasMenu) {
        offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
            indicators.forEach(indicator => indicator.style.display = 'none');
        });
        offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
            indicators.forEach(indicator => indicator.style.display = 'block');
        });
    }

    // Handle elements that should fade in or appear when scrolled into view
    const faders = document.querySelectorAll('.fade-in, .scale-up, .slide-in-left, .slide-in-right');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target); // Stop observing once the element is visible
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Throttled scroll handling to optimize performance
    let isThrottled = false;
    window.addEventListener('scroll', () => {
        if (!isThrottled) {
            isThrottled = true;
            requestAnimationFrame(() => {
                updateSectionInfo();
                isThrottled = false;
            });
        }
    });

    // Initial call to set the correct state when the page is loaded
    updateSectionInfo();
});