(() => {
  'use strict';

  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const year = document.getElementById('currentYear');
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const cursorGlow = document.querySelector('.cursor-glow');
  const storageKey = 'pedro-portfolio-theme';

  const applyTheme = (theme, persist = true) => {
    const safeTheme = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', safeTheme);
    if (persist) localStorage.setItem(storageKey, safeTheme);

    const isLight = safeTheme === 'light';
    if (icon) icon.className = isLight ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    if (toggle) {
      toggle.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
      toggle.setAttribute('title', isLight ? 'Modo oscuro' : 'Modo claro');
    }
    if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f4f7fb' : '#080c14');
  };

  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme || 'dark', false);

  toggle?.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav?.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  const updateBackToTop = () => {
    backToTop?.classList.toggle('show', window.scrollY > 650);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (year) year.textContent = new Date().getFullYear();

  if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }
})();
