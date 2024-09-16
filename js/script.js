'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionTitle = document.getElementById('sectionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const offcanvasMenu = document.getElementById('offcanvasNavbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Preloader functionality
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    // Update section information and animate the section title
    function updateSectionInfo() {
        let currentSection = '';
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                currentSection = section.getAttribute('id');
                updateIndicators(index);
                updateNavLinks(currentSection);
            }
        });

        let newTitle = '';
        switch (currentSection) {
            case 'about-me':
                newTitle = 'ABOUT ME';
                break;
            case 'projects':
                newTitle = 'PROJECTS';
                break;
            case 'leisure-and-hobbies':
                newTitle = 'Leisure & Hobbies';
                break;
            case 'student-memories':
                newTitle = 'Student Memories';
                break;
            default:
                newTitle = '';
        }

        // Check if the title has changed and animate the change
        if (sectionTitle.textContent !== newTitle) {
            // Create a temporary element with the new title and animate the flip
            const tempTitle = document.createElement('span');
            tempTitle.textContent = newTitle;
            tempTitle.classList.add('flip');

            // Clear previous content and add the new animated content
            sectionTitle.innerHTML = '';
            sectionTitle.appendChild(tempTitle);

            // Update the title after the animation ends
            tempTitle.addEventListener('animationend', () => {
                sectionTitle.textContent = newTitle;
            });
        }
    }

    // Update the indicators to reflect the current section
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('filled');
            } else {
                indicator.classList.remove('filled');
            }
        });
    }

    // Update the navigation links to highlight the current section
    function updateNavLinks(currentSection) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    // Handle showing and hiding of indicators when the offcanvas menu is toggled
    offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
        indicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    });

    offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
        indicators.forEach(indicator => {
            indicator.style.display = 'block';
        });
    });

    // Intersection observer to handle fade-in effects for elements
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Listen for scroll events to update section information
    window.addEventListener('scroll', updateSectionInfo);
    updateSectionInfo();
});