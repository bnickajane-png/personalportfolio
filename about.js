/* =========================================================================
   ABOUT.JS
   - Animated counters for the Stats strip
   ========================================================================= */

/* â”€â”€ Animated Counters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const counters = document.querySelectorAll('.counter[data-target]');

if (counters.length) {
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el     = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const start  = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / 1400, 1);
                const eased    = 1 - Math.pow(1 - progress, 3); /* cubic ease-out */
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObs.observe(el));
}