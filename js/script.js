'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const sectionTitle = document.getElementById('sectionTitle');
    const indicators = document.querySelectorAll('.indicator');
    const offcanvasMenu = document.getElementById('offcanvasNavbar');
    const navLinks = document.querySelectorAll('.nav-link');

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

    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('filled');
            } else {
                indicator.classList.remove('filled');
            }
        });
    }

    function updateNavLinks(currentSection) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active-link'); // Lägg till en klass för aktiv länk
            } else {
                link.classList.remove('active-link');
            }
        });
    }

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

    window.addEventListener('scroll', updateSectionInfo);
    updateSectionInfo();
});