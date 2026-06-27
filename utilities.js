/* =========================================================================
   UTILITIES.JS
   - Theme toggle (dark / light)
   - Scroll reveal (.fade-up, .fade-left, .fade-right)
   - Back-to-top button
   - Card spotlight glow + 3D tilt (desktop only)
   ========================================================================= */

/* â”€â”€ Theme Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.textContent = t === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F';
    themeBtn.title       = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    localStorage.setItem('portfolio-theme', t);
}

themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* Restore saved preference (default: dark) */
applyTheme(localStorage.getItem('portfolio-theme') || 'dark');

/* â”€â”€ Scroll Reveal (.fade-up) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

/* â”€â”€ Directional Scroll Reveal (.fade-left / .fade-right) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const dirObserver = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
);
document.querySelectorAll('.fade-left, .fade-right').forEach(el => dirObserver.observe(el));

/* â”€â”€ Back-to-Top Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* â”€â”€ Card Spotlight Glow + 3D Tilt (desktop only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
if (!isMobile() && !reduced) {
    document.querySelectorAll('.project-card, .skill-block, .highlight-card').forEach(card => {
        const sp = document.createElement('div');
        sp.className = 'card-spotlight';
        card.appendChild(sp);

        card.addEventListener('mousemove', e => {
            const r    = card.getBoundingClientRect();
            const x    = e.clientX - r.left;
            const y    = e.clientY - r.top;
            const rotX = ((y - r.height / 2) / (r.height / 2)) * -3.5;
            const rotY = ((x - r.width  / 2) / (r.width  / 2)) *  3.5;

            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
            sp.style.setProperty('--sp-x', (x / r.width  * 100) + '%');
            sp.style.setProperty('--sp-y', (y / r.height * 100) + '%');
        });

        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}