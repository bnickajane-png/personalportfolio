/* =========================================================================
   HERO.JS
   - Particle canvas background
   - Typewriter effect
   - Hero staggered fade-in sequence
   ========================================================================= */

/* â”€â”€ Particle Canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function () {
    const canvas = document.getElementById('hero-canvas');
    const ctx    = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 18000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x:     Math.random() * canvas.width,
                y:     Math.random() * canvas.height,
                r:     Math.random() * 1.5 + 0.4,
                dx:    (Math.random() - 0.5) * 0.35,
                dy:    (Math.random() - 0.5) * 0.35,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(245,184,0,' + p.alpha + ')';
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.dy *= -1;

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = 'rgba(245,184,0,' + (0.06 * (1 - d / 100)) + ')';
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();
})();

/* â”€â”€ Typewriter Effect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function () {
    const phrases = [
        'Smart Solutions',
        'Better Systems',
        'Data-Driven Results',
        'Elegant Workflows',
        'Business Value'
    ];
    const el = document.getElementById('typewriter-text');
    let pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const phrase = phrases[pIdx];

        if (!deleting) {
            el.textContent = phrase.slice(0, cIdx + 1);
            cIdx++;
            if (cIdx === phrase.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
            setTimeout(tick, 75);
        } else {
            el.textContent = phrase.slice(0, cIdx - 1);
            cIdx--;
            if (cIdx === 0) {
                deleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 40);
        }
    }

    tick();
})();

/* â”€â”€ Hero Staggered Fade-In â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const heroEls = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-sub, .hero-ctas, .hero-photo'
);

if (!reduced) {
    /* Double rAF: ensure browser has painted before triggering transitions */
    requestAnimationFrame(() => requestAnimationFrame(() => {
        heroEls.forEach(el => el.classList.add('hr'));
    }));
} else {
    /* Reduced motion: reveal immediately */
    heroEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
}