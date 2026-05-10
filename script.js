document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de toutes les fonctionnalités
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    initMorphingShape();
    initActiveNavHighlight();
});

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05 
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Délai pour fluidité mobile
                const delay = window.innerWidth < 992 ? 100 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // SPECIAL MOBILE : Effet visuel automatique sans hover
                    if (window.innerWidth < 992 && entry.target.classList.contains('island-card')) {
                        entry.target.style.borderColor = "rgba(255, 215, 0, 0.5)";
                        entry.target.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.1)";
                    }
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * Navbar Background Change
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, { passive: true });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.glass-nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
                // Fermeture menu mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

/**
 * Morphing Shape Hero
 */
function initMorphingShape() {
    const morphPath = document.querySelector('.morph-path');
    if (!morphPath) return;
    const shapes = [
        'M50,15 L85,75 L15,75 Z',
        'M50,10 L90,50 L50,90 L10,50 Z',
        'M50,10 L90,40 L75,85 L25,85 L10,40 Z',
        'M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z',
        'M50,10 L79,21 L90,50 L79,79 L50,90 L21,79 L10,50 L21,21 Z',
        'M50,10 L58,38 L88,38 L64,56 L73,85 L50,68 L27,85 L36,56 L12,38 L42,38 Z'
    ];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % shapes.length;
        morphPath.setAttribute('d', shapes[index]);
    }, 2500);
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    }, { passive: true });
}

// Modal Vidéo
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function () {
            const iframe = modal.querySelector('iframe');
            const src = iframe.src;
            iframe.src = ''; iframe.src = src;
        });
    }
});