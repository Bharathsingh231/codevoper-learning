// ============================================
// CODEVOPER LEARNING — Dashboard JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateProgressBars();
});

// Animate counter numbers
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// Animate progress bars after a short delay
function animateProgressBars() {
  setTimeout(() => {
    document.querySelectorAll('[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 500);
}
