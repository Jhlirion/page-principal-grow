/* ============================================================
   YourGrowPartner IA — JavaScript principal
   ============================================================
   1. Scroll Reveal
   2. Navbar sombra al hacer scroll
   3. FAQ Accordion
   4. Formulario de contacto
   ============================================================ */

/* ── 1. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero aparece de inmediato
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 80);


/* ── 2. NAVBAR ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});


/* ── 3. FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}


/* ── 4. FORMULARIO ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent   = 'Enviando...';
  btn.disabled      = true;
  btn.style.opacity = '0.6';
  setTimeout(() => {
    btn.textContent      = '✓ Enviado — te contactamos en breve';
    btn.style.background = '#00E5A0';
    btn.style.color      = '#080809';
    btn.style.opacity    = '1';
  }, 1200);
}
