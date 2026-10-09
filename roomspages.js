(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll → frosted glass
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Inject hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;
  navbar.appendChild(hamburger);

  const navLinks = navbar.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const open = navbar.classList.toggle('menu-open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close menu when a link is clicked
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('menu-open'));
  });
})();

(function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


function updateDateTime() {
    const now = new Date();

    // Date
    const date = now.toLocaleDateString();

    // Time (HH:MM:SS)
    const time = now.toLocaleTimeString();

    document.getElementById("dateTime").innerText = "Last Updated: " + date + " | " + time;
}

updateDateTime();

setInterval(updateDateTime, 1000);
