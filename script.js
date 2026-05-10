document.addEventListener('DOMContentLoaded', function() {
    // 1. Lancement des fonctions
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    initMorphingShape();
    initActiveNavHighlight();
    initModalVideo();

    // 2. Sécurité : Si après 2s rien n'est apparu, on force l'affichage
    setTimeout(() => {
        document.querySelectorAll('.reveal-fade').forEach(el => {
            if (!el.classList.contains('revealed')) el.classList.add('revealed');
        });
    }, 2000);
});

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade');
    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Effet spécial mobile automatique
                if (window.innerWidth < 992 && entry.target.classList.contains('island-card')) {
                    entry.target.style.borderColor = "rgba(255, 215, 0, 0.5)";
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

function initNavbarScroll() {
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }, { passive: true });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.glass-nav').offsetHeight;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                const menu = document.querySelector('.navbar-collapse');
                if (menu.classList.contains('show')) bootstrap.Collapse.getInstance(menu).hide();
            }
        });
    });
}

function initMorphingShape() {
    const path = document.querySelector('.morph-path');
    if (!path) return;
    const shapes = [
        'M50,15 L85,75 L15,75 Z',
        'M50,10 L90,50 L50,90 L10,50 Z',
        'M50,10 L90,40 L75,85 L25,85 L10,40 Z'
    ];
    let i = 0;
    setInterval(() => {
        i = (i + 1) % shapes.length;
        path.setAttribute('d', shapes[i]);
    }, 2500);
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute('id'); });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href').includes(current)) l.classList.add('active');
        });
    }, { passive: true });
}

function initModalVideo() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function () {
            const ifr = modal.querySelector('iframe');
            const s = ifr.src; ifr.src = ''; ifr.src = s;
        });
    }
}