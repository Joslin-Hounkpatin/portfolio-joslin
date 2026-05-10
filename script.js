/**
 * JOSLIN HOUNKPATIN - Premium Portfolio
 * Vanilla JavaScript for interactions and animations
 */

/**
 * Morphing Geometric Shape Animation
 * Creates a continuously morphing shape that transforms between geometric forms
 */
function initMorphingShape() {
    const morphPath = document.querySelector('.morph-path');
    
    if (!morphPath) return;
    
    // Define geometric shapes as SVG path data (centered in 100x100 viewBox)
    const shapes = [
        // Triangle
        'M50,15 L85,75 L15,75 Z',
        // Square (rotated 45deg - diamond)
        'M50,10 L90,50 L50,90 L10,50 Z',
        // Pentagon
        'M50,10 L90,40 L75,85 L25,85 L10,40 Z',
        // Hexagon
        'M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z',
        // Circle approximation (8 points)
        'M50,10 L79,21 L90,50 L79,79 L50,90 L21,79 L10,50 L21,21 Z',
        // Star
        'M50,10 L58,38 L88,38 L64,56 L73,85 L50,68 L27,85 L36,56 L12,38 L42,38 Z',
        // Cross
        'M35,15 L65,15 L65,35 L85,35 L85,65 L65,65 L65,85 L35,85 L35,65 L15,65 L15,35 L35,35 Z',
        // Octagon
        'M30,10 L70,10 L90,30 L90,70 L70,90 L30,90 L10,70 L10,30 Z'
    ];
    
    let currentShapeIndex = 0;
    let progress = 0;
    const morphDuration = 2500; // Duration per shape transition in ms
    let lastTimestamp = null;
    
    // Parse path data into coordinates
    function parsePath(pathData) {
        const coords = [];
        const regex = /([ML])\s*([\d.]+)\s*,\s*([\d.]+)/g;
        let match;
        
        while ((match = regex.exec(pathData)) !== null) {
            coords.push({ x: parseFloat(match[2]), y: parseFloat(match[3]) });
        }
        
        return coords;
    }
    
    // Interpolate between two coordinate sets
    function interpolateCoords(from, to, t) {
        // Easing function for smoother animation
        const easeInOutCubic = t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const easedT = easeInOutCubic;
        const result = [];
        const maxLen = Math.max(from.length, to.length);
        
        for (let i = 0; i < maxLen; i++) {
            const fromPoint = from[i % from.length];
            const toPoint = to[i % to.length];
            
            result.push({
                x: fromPoint.x + (toPoint.x - fromPoint.x) * easedT,
                y: fromPoint.y + (toPoint.y - fromPoint.y) * easedT
            });
        }
        
        return result;
    }
    
    // Convert coordinates back to path data
    function coordsToPath(coords) {
        if (coords.length === 0) return '';
        
        let path = `M${coords[0].x.toFixed(1)},${coords[0].y.toFixed(1)}`;
        
        for (let i = 1; i < coords.length; i++) {
            path += ` L${coords[i].x.toFixed(1)},${coords[i].y.toFixed(1)}`;
        }
        
        return path + ' Z';
    }
    
    // Animation loop
    function animate(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        const elapsed = timestamp - lastTimestamp;
        progress += elapsed / morphDuration;
        
        if (progress >= 1) {
            progress = 0;
            currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
        }
        
        const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
        const fromCoords = parsePath(shapes[currentShapeIndex]);
        const toCoords = parsePath(shapes[nextShapeIndex]);
        
        const interpolated = interpolateCoords(fromCoords, toCoords, progress);
        const newPath = coordsToPath(interpolated);
        
        morphPath.setAttribute('d', newPath);
        
        lastTimestamp = timestamp;
        requestAnimationFrame(animate);
    }
    
    // Set initial shape and start animation
    morphPath.setAttribute('d', shapes[0]);
    requestAnimationFrame(animate);
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    initMorphingShape();
});

/**
 * Scroll Reveal Animation using Intersection Observer
 * Triggers fade-in-up animations as elements enter the viewport
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade');
    
    if (!revealElements.length) return;
    
    // On ajuste le seuil : 0.05 (5%) est plus sensible pour le mobile
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Déclenche l'effet 50px avant que l'élément n'entre totalement
        threshold: 0.05 
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // On ajoute un léger délai sur mobile pour laisser le processeur respirer
                const delay = window.innerWidth < 992 ? 100 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // SPECIAL MOBILE: Active l'éclat doré automatiquement au passage
            if (window.innerWidth < 992) {
                entry.target.style.borderColor = "rgba(255, 215, 0, 0.5)";
                entry.target.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.1)";
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
}


/**
 * Navbar Background Change on Scroll
 * Adds 'scrolled' class when page is scrolled
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.glass-nav');
    
    if (!navbar) return;
    
    const scrollThreshold = 50;
    
    function handleNavbarScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleNavbarScroll();
    
    // Listen for scroll events with passive flag for performance
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

/**
 * Smooth Scroll for Navigation Links
 * Handles anchor links with smooth scrolling and closes mobile menu
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}


function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
}
// Gestion de la fermeture du modal vidéo
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('hidden.bs.modal', function () {
            const iframe = videoModal.querySelector('iframe');
            const currentSrc = iframe.src;
            // On réinitialise la source de l'iframe pour couper la vidéo/le son
            iframe.src = '';
            iframe.src = currentSrc;
        });
    }
});
