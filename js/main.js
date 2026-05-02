/* ============================================================
   NexoIA — JavaScript principal
   ============================================================
   1. Scroll Reveal
   2. Navbar sombra al hacer scroll
   3. Typewriter — texto animado en el hero
   4. Partículas de fondo (canvas)
   5. FAQ Accordion
   6. Formulario de contacto
   7. Hero image zoom
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


/* ── 3. TYPEWRITER — texto que cambia en el hero ── */
const words   = ['inteligencia', 'datos reales', 'automatización', 'IA aplicada'];
let   wIndex  = 0;
let   cIndex  = 0;
let   deleting = false;
const el      = document.getElementById('typewriter');

function type() {
  if (!el) return;
  const word    = words[wIndex];
  const speed   = deleting ? 50 : 90;
  const pause   = deleting ? 0 : 1800;

  if (!deleting) {
    el.textContent = word.slice(0, ++cIndex);
    if (cIndex === word.length) {
      deleting = true;
      setTimeout(type, pause);
      return;
    }
  } else {
    el.textContent = word.slice(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      wIndex   = (wIndex + 1) % words.length;
    }
  }
  setTimeout(type, speed);
}
type();


/* ── 4. PARTÍCULAS DE FONDO (canvas) ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const TEAL   = '0,229,160';
  let   W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); build(); });

  function build() {
    const count = Math.floor((W * H) / 22000);
    particles   = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o:  Math.random() * 0.4 + 0.1,
    }));
  }
  build();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${TEAL},${p.o})`;
      ctx.fill();
    });

    // líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${TEAL},${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ── 5. FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}


/* ── 6. FORMULARIO ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent   = 'Enviando...';
  btn.disabled      = true;
  btn.style.opacity = '0.6';
  setTimeout(() => {
    btn.textContent        = '✓ Enviado — te contactamos en breve';
    btn.style.background   = '#00E5A0';
    btn.style.color        = '#080809';
    btn.style.opacity      = '1';
  }, 1200);
}


/* ── 7. HERO IMAGE ZOOM ── */
window.addEventListener('load', () => {
  const img = document.querySelector('.hero-img-wrap img');
  if (img) img.style.transform = 'scale(1.05)';
});
