/* =========================================================================
   NAVIGATION.JS
   - Hamburger mobile menu toggle
   - Nav active-link highlight on scroll
   - Scroll progress bar
   - Nav glassmorphism on scroll
   ========================================================================= */

/* Global flags (referenced by other section scripts) */
const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.matchMedia('(hover: none)').matches;

/* â”€â”€ Hamburger Mobile Menu â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        mobileMenu.style.display = 'flex';
        requestAnimationFrame(() => mobileMenu.classList.add('open'));
    } else {
        mobileMenu.classList.remove('open');
        setTimeout(() => {
            if (!mobileMenu.classList.contains('open')) {
                mobileMenu.style.display = '';
            }
        }, 300);
    }
});

/* Close mobile menu when any link is tapped */
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        setTimeout(() => { mobileMenu.style.display = ''; }, 300);
    });
});

/* â”€â”€ Nav Active State on Scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const allSections    = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchorLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
}, { passive: true });

/* â”€â”€ Scroll Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const pct = window.scrollY
        / (document.documentElement.scrollHeight - window.innerHeight)
        * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* â”€â”€ Nav Glassmorphism on Scroll â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
    navEl.classList.toggle('nav-scrolled', window.scrollY > 40);
}, { passive: true });