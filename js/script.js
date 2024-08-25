'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionTitle = document.getElementById('sectionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const offcanvasMenu = document.getElementById('offcanvasNavbar');

    // Update section title and indicators based on scroll position
    function updateSectionInfo() {
        let currentSection = '';
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                currentSection = section.getAttribute('id');
                updateIndicators(index);
            }
        });

        switch (currentSection) {
            case 'about-me':
                sectionTitle.textContent = 'ABOUT ME';
                break;
            case 'projects':
                sectionTitle.textContent = 'PROJECTS';
                break;
            case 'spare-time':
                sectionTitle.textContent = 'SPARE TIME';
                break;
            case 'student-union':
                sectionTitle.textContent = 'STUDENT UNION';
                break;
            default:
                sectionTitle.textContent = '';
        }
    }

    // Update the indicators
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('filled');
            } else {
                indicator.classList.remove('filled');
            }
        });
    }

    // Hide indicators when Offcanvas is shown
    offcanvasMenu.addEventListener('show.bs.offcanvas', () => {
        indicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    });

    // Show indicators when Offcanvas is hidden
    offcanvasMenu.addEventListener('hidden.bs.offcanvas', () => {
        indicators.forEach(indicator => {
            indicator.style.display = 'block';
        });
    });

    // Fade-in animation on scroll
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

    // Event listeners
    window.addEventListener('scroll', updateSectionInfo);
    updateSectionInfo(); // Update on page load
});
