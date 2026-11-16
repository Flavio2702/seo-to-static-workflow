document.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-interaction="nav_toggle"]');
  if (!toggle) return;
  const nav = document.querySelector('[data-nav]');
  const current = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!current));
  if (nav) nav.setAttribute('data-open', String(!current));
});
