// ── FORM VALIDATION ──
function validateForm() {
    let valid = true;
    const fields = [
        { id: 'fname', check: v => v.trim().length >= 3 },
        { id: 'femail', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
        { id: 'finst', check: v => v.trim().length > 0 },
        { id: 'ftopic', check: v => v !== '' },
        { id: 'fmsg', check: v => v.trim().length >= 10 },
    ];
    fields.forEach(({ id, check }) => {
        const el = document.getElementById(id);
        if (check(el.value)) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
        else { el.classList.remove('is-valid'); el.classList.add('is-invalid'); valid = false; }
    });
    if (valid) {
        document.getElementById('contactForm').classList.add('d-none');
        document.getElementById('formSuccess').classList.remove('d-none');
        setTimeout(() => {
            const m = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            m.hide();
            setTimeout(() => {
                document.getElementById('contactForm').classList.remove('d-none');
                document.getElementById('formSuccess').classList.add('d-none');
                fields.forEach(({ id }) => { const el = document.getElementById(id); el.value = ''; el.classList.remove('is-valid', 'is-invalid'); });
            }, 400);
        }, 1800);
    }
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── NAVBAR ACTIVE ──
const sections = document.querySelectorAll('.section-anchor');
const links = document.querySelectorAll('.nav-link[href^="#"]');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    links.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + cur) l.classList.add('active'); });
});