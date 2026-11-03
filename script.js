// ============================================
// CODEVOPER LEARNING — JavaScript (Dark Theme)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initClassOverlay();
  initParticles();
  initCounters();
});

// ============================================
// Navbar scroll effect
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle) toggle.classList.remove('active');
  if (menu) menu.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      closeMobileMenu();
    });
  });
}

// ============================================
// Particles Generator
// ============================================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 25;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${6 + Math.random() * 8}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = `${0.2 + Math.random() * 0.5}`;
    const size = 2 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    container.appendChild(particle);
  }
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        const formatK = entry.target.getAttribute('data-format') === 'k';

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(eased * target);
          if (formatK) {
            entry.target.textContent = Math.floor(currentVal / 1000) + 'K+';
          } else {
            entry.target.textContent = currentVal + '+';
          }
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            entry.target.textContent = formatK ? '50K+' : (target + '+');
          }
        }
        requestAnimationFrame(update);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ============================================
// Class Selector Overlay
// ============================================
function initClassOverlay() {
  const overlay = document.getElementById('classOverlay');
  const closeBtn = document.getElementById('classOverlayClose');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeClassOverlay);
  }

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeClassOverlay();
  });

  // Close on backdrop click (if clicking overlay itself, not a child box)
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeClassOverlay();
    });
  }
}

function openClassOverlay() {
  const overlay = document.getElementById('classOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Reset all boxes on open
  document.querySelectorAll('.class-box').forEach(box => {
    box.classList.remove('opened');
    box.classList.remove('child-out');
  });
}

function closeClassOverlay() {
  const overlay = document.getElementById('classOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';

  // Reset boxes
  document.querySelectorAll('.class-box').forEach(box => {
    box.classList.remove('opened');
    box.classList.remove('child-out');
  });
}

// ============================================
// Single-Click Box Open & Instant Smooth Enter
// ============================================
function openClassBox(boxElement) {
  if (boxElement.classList.contains('opening')) return;
  boxElement.classList.add('opening');

  // Reset other boxes
  document.querySelectorAll('.class-box').forEach(box => {
    if (box !== boxElement) {
      box.classList.remove('opened');
      box.classList.remove('child-out');
      box.classList.remove('opening');
      const sparkles = box.querySelector('.class-box-sparkles');
      if (sparkles) sparkles.innerHTML = '';
    }
  });

  // Open this box & animate child popping out
  boxElement.classList.add('opened');
  boxElement.classList.add('child-out');
  createSparkles(boxElement);
  playPopSound();

  // Single click: display motion and smoothly navigate into class with no waiting!
  const targetUrl = boxElement.getAttribute('data-url');
  if (targetUrl) {
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 550);
  }
}

// Backward compatibility aliases
function toggleBoxOpen(boxElement, event) {
  openClassBox(boxElement);
}

function toggleChildOut(boxElement) {
  openClassBox(boxElement);
}

// ============================================
// Sparkle Effect
// ============================================
function createSparkles(boxElement) {
  const container = boxElement.querySelector('.class-box-sparkles');
  if (!container) return;

  container.innerHTML = '';

  const colors = ['#F59E0B', '#EC4899', '#10B981', '#3B82F6', '#8B5CF6', '#F43F5E', '#14B8A6'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (360 / count) * i;
    const distance = 70 + Math.random() * 80;
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance;
    const size = 5 + Math.random() * 9;
    const delay = Math.random() * 0.15;

    sparkle.style.cssText = `
      left: 50%;
      top: 35%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      box-shadow: 0 0 10px ${color};
      --tx: ${tx}px;
      --ty: ${ty}px;
      animation-delay: ${delay}s;
    `;

    container.appendChild(sparkle);
  }
}

// ============================================
// Sound (Web Audio API)
// ============================================
function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.28);
  } catch (e) {
    // Audio context may not be allowed until user gesture, handles gracefully
  }
}

// ============================================
// Parallax & Feature card tilt
// ============================================
window.addEventListener('scroll', () => {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;

  const scrolled = window.pageYOffset;
  if (scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
}, { passive: true });

document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / 25;
    const ry = (cx - x) / 25;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
