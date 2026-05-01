/* ============================================================
   NexoIA — JavaScript principal
   ============================================================
   1. Scroll Reveal
   2. Navbar sombra al hacer scroll
   3. FAQ Accordion
   4. Formulario de contacto
   5. Hero image zoom al cargar
   ============================================================ */


/* ── 1. SCROLL REVEAL ──────────────────────────────────────
   Todos los elementos con clase .reveal aparecen suavemente
   cuando entran en pantalla al hacer scroll.
   ────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// El hero aparece de inmediato sin esperar scroll
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 80);


/* ── 2. NAVBAR — SOMBRA AL HACER SCROLL ─────────────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});


/* ── 3. FAQ ACCORDION ────────────────────────────────────── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Cierra todos los items abiertos
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Abre el que se clickeó (solo si estaba cerrado)
  if (!isOpen) item.classList.add('open');
}


/* ── 4. FORMULARIO DE CONTACTO ───────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  const btn        = document.getElementById('submit-btn');
  const originalTx = btn.textContent;

  // Estado de carga
  btn.textContent  = 'Enviando...';
  btn.disabled     = true;
  btn.style.opacity = '0.7';

  // Simula envío (aquí conectarás tu backend o Formspree)
  setTimeout(() => {
    btn.textContent   = '✓ ¡Mensaje enviado! Te contactamos pronto.';
    btn.style.background = 'var(--teal)';
    btn.style.opacity    = '1';
  }, 1200);
}


/* ── 5. HERO IMAGE — ZOOM SUAVE AL CARGAR ─────────────────── */
window.addEventListener('load', () => {
  const heroImg = document.querySelector('.hero-image-col img');
  if (heroImg) heroImg.style.transform = 'scale(1.04)';
});
