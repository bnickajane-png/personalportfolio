/* =========================================================================
   CONTACT.JS  -- LOCKED -- DO NOT MODIFY
   EmailJS Integration:
     Service ID:  service_m2jukcn
     Template ID: template_zlmm8do
     Public Key:  qTZvQcIs3U26D7h5Y
   ========================================================================= */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input, errEl, fn) {
    const ok = fn(input.value.trim());
    input.classList.toggle('error', !ok);
    errEl.classList.toggle('show', !ok);
    return ok;
}

/* Initialise EmailJS */
(function () {
    emailjs.init({ publicKey: 'qTZvQcIs3U26D7h5Y' });
})();

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const n  = document.getElementById('form-name'),    en  = document.getElementById('err-name');
    const em = document.getElementById('form-email'),   eem = document.getElementById('err-email');
    const s  = document.getElementById('form-subject'), es  = document.getElementById('err-subject');
    const m  = document.getElementById('form-message'), em2 = document.getElementById('err-message');
    const errGeneral = document.getElementById('err-general');

    /* Clear previous general error */
    if (errGeneral) { errGeneral.classList.remove('show'); errGeneral.textContent = ''; }

    const ok = [
        validate(n,  en,  v => v.length >= 2),
        validate(em, eem, v => emailRe.test(v)),
        validate(s,  es,  v => v.length >= 2),
        validate(m,  em2, v => v.length >= 10)
    ].every(Boolean);

    if (ok) {
        const btn = document.getElementById('submit-btn');
        btn.textContent = 'Sending\u2026';
        btn.disabled    = true;

        emailjs.sendForm('service_m2jukcn', 'template_zlmm8do', form)
            .then(function () {
                /* Success */
                form.style.display = 'none';
                document.getElementById('form-success').classList.add('show');
                form.reset();
                btn.textContent = 'Send Message \u2192';
                btn.disabled    = false;
            }, function (error) {
                /* Failure */
                console.error('EmailJS error:', error);
                if (errGeneral) {
                    errGeneral.textContent = 'Failed to send. Please check your connection and try again.';
                    errGeneral.classList.add('show');
                }
                btn.textContent = 'Send Message \u2192';
                btn.disabled    = false;
            });
    }
});

/* Real-time inline validation on blur + error clear on input */
['form-name', 'form-email', 'form-subject', 'form-message'].forEach(id => {
    const input = document.getElementById(id);
    const errEl = document.getElementById('err-' + id.replace('form-', ''));

    input.addEventListener('blur', () => {
        if (!input.value.trim()) return;
        if (id === 'form-email') validate(input, errEl, v => emailRe.test(v));
        else validate(input, errEl, v => v.length >= (id === 'form-message' ? 10 : 2));
    });

    input.addEventListener('input', () => {
        input.classList.remove('error');
        if (errEl) errEl.classList.remove('show');
        const eg = document.getElementById('err-general');
        if (eg) eg.classList.remove('show');
    });
});

function resetForm() {
    form.reset();
    form.style.display = '';
    document.getElementById('form-success').classList.remove('show');
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Send Message \u2192';
    btn.disabled    = false;
    document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
}

/* Form label highlight on focus */
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    const label = input.closest('.form-group')?.querySelector('.form-label');
    if (!label) return;
    input.addEventListener('focus', () => { label.style.color = 'var(--gold)'; });
    input.addEventListener('blur',  () => { label.style.color = '';            });
});