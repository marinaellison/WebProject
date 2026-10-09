/* ─── 1. NAVBAR: scroll effect + mobile hamburger ─────────── */
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


/* ─── 2. SCROLL-REVEAL ANIMATIONS ─────────────────────────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.room-card, .feature-item, .value-card, .testi-card, ' +
    '.tl-item, .team-card, .award-item, .stat-item, ' +
    '.intro-text, .intro-image-wrap, .exp-content, .exp-image'
  );

  if (!targets.length) return;

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity .55s ease ${(i % 4) * 0.1}s, transform .55s ease ${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


/* ─── 3. BOOKING FORM VALIDATION ──────────────────────────── */
(function initBookingBar() {
  const bar = document.querySelector('.booking-bar');
  if (!bar) return;

  const checkIn  = bar.querySelector('input[type="date"]:first-of-type') ||
                   bar.querySelectorAll('input[type="date"]')[0];
  const checkOut = bar.querySelectorAll('input[type="date"]')[1];
  const btn      = bar.querySelector('.search-btn');

  // Set min date = today
  const today = new Date().toISOString().split('T')[0];
  if (checkIn)  checkIn.setAttribute('min', today);
  if (checkOut) checkOut.setAttribute('min', today);

  // Auto-advance checkout to next day when checkin is picked
  checkIn?.addEventListener('change', () => {
    if (!checkIn.value) return;
    const next = new Date(checkIn.value);
    next.setDate(next.getDate() + 1);
    const nextStr = next.toISOString().split('T')[0];
    if (checkOut) {
      checkOut.setAttribute('min', nextStr);
      if (!checkOut.value || checkOut.value <= checkIn.value) {
        checkOut.value = nextStr;
      }
    }
  });

  btn?.addEventListener('click', () => {
    const errors = [];
    if (!checkIn?.value)  errors.push('Please select a check-in date.');
    if (!checkOut?.value) errors.push('Please select a check-out date.');
    if (checkIn?.value && checkOut?.value && checkOut.value <= checkIn.value) {
      errors.push('Check-out must be after check-in.');
    }

    if (errors.length) {
      showToast(errors[0], 'error');
      return;
    }

    showToast('Checking availability…', 'success');
    // Hook your real booking API here
  });
})();


/* ─── 4. LIGHTBOX FOR GALLERY & ROOM IMAGES ───────────────── */
(function initLightbox() {
  // Build overlay once
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <button class="lb-close" aria-label="Close">✕</button>
      <button class="lb-prev" aria-label="Previous">‹</button>
      <img class="lb-img" src="" alt="">
      <button class="lb-next" aria-label="Next">›</button>
      <p class="lb-caption"></p>
    </div>`;
  document.body.appendChild(overlay);

  const lbImg     = overlay.querySelector('.lb-img');
  const lbCaption = overlay.querySelector('.lb-caption');
  let images = [], currentIdx = 0;

  function open(idx) {
    currentIdx = idx;
    lbImg.src = images[currentIdx].src;
    lbCaption.textContent = images[currentIdx].alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function prev() { open((currentIdx - 1 + images.length) % images.length); }
  function next() { open((currentIdx + 1) % images.length); }

  overlay.querySelector('.lb-close').addEventListener('click', close);
  overlay.querySelector('.lb-prev').addEventListener('click', prev);
  overlay.querySelector('.lb-next').addEventListener('click', next);
  overlay.querySelector('.lb-backdrop').addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // Collect all gallery + room images
  function registerImages() {
    const selectors = '.gallery-item img, .room-img img';
    const imgs = Array.from(document.querySelectorAll(selectors));
    images = imgs.map(img => ({ src: img.src, alt: img.alt }));

    imgs.forEach((img, idx) => {
      img.parentElement.style.cursor = 'zoom-in';
      img.parentElement.addEventListener('click', () => open(idx));
    });
  }

  registerImages();
})();


/* ─── 5. BACK-TO-TOP BUTTON ───────────────────────────────── */
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


/* ─── 6. SMOOTH ANCHOR SCROLL ─────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─── 7. TOAST NOTIFICATION HELPER ───────────────────────── */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('toast--show'));

  setTimeout(() => {
    toast.classList.remove('toast--show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3200);
}


/* ─── 8. STAT COUNTER ANIMATION (about.html) ──────────────── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  function animateCount(el) {
    const raw    = el.textContent.replace(/[^0-9.]/g, '');
    const target = parseFloat(raw);
    const suffix = el.innerHTML.replace(raw, '').replace(/[0-9.]/g, '');
    if (isNaN(target)) return;

    const duration = 1800;
    const start    = performance.now();
    const isFloat  = raw.includes('.');

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value    = isFloat
        ? (target * ease).toFixed(1)
        : Math.floor(target * ease);
      el.innerHTML = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();


/* ─── 9. INJECT STYLES FOR JS-ADDED ELEMENTS ─────────────── */
(function injectStyles() {
  const css = `
    /* Hamburger */
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      z-index: 200;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: #fff;
      transition: transform .3s, opacity .3s;
    }
    .navbar.menu-open .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .navbar.menu-open .hamburger span:nth-child(2) { opacity: 0; }
    .navbar.menu-open .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 860px) {
      .hamburger { display: flex; }
      .navbar { flex-wrap: wrap; padding: 16px 24px; }
      .nav-links {
        display: none;
        flex-direction: column;
        gap: 0;
        width: 100%;
        padding: 12px 0 8px;
        border-top: 1px solid rgba(255,255,255,.1);
        margin-top: 10px;
      }
      .navbar.menu-open .nav-links { display: flex; }
      .nav-links li a { display: block; padding: 10px 0; }
      .book-btn { display: none; }
    }

    /* Lightbox */
    #lightbox {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity .3s;
    }
    #lightbox.active { opacity: 1; pointer-events: all; }
    .lb-backdrop {
      position: absolute; inset: 0;
      background: rgba(5,15,30,.92);
      backdrop-filter: blur(6px);
    }
    .lb-content {
      position: relative; z-index: 1;
      display: flex; align-items: center; gap: 16px;
      max-width: 90vw;
    }
    .lb-img {
      max-width: 80vw; max-height: 82vh;
      object-fit: contain; border-radius: 2px;
      display: block;
    }
    .lb-close {
      position: fixed; top: 24px; right: 32px;
      background: none; border: none; color: #fff;
      font-size: 1.6rem; cursor: pointer; opacity: .7;
      transition: opacity .2s;
    }
    .lb-close:hover { opacity: 1; }
    .lb-prev, .lb-next {
      background: rgba(255,255,255,.12); border: none; color: #fff;
      font-size: 2rem; padding: 12px 18px; cursor: pointer; border-radius: 2px;
      transition: background .2s;
    }
    .lb-prev:hover, .lb-next:hover { background: rgba(59,163,214,.5); }
    .lb-caption {
      position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,.6); font-size: .85rem;
      letter-spacing: .06em;
    }

    /* Back to top */
    #back-to-top {
      position: fixed; bottom: 32px; right: 32px;
      width: 44px; height: 44px; border-radius: 2px;
      background: var(--ocean, #0d3b6e);
      color: #fff; border: 1.5px solid rgba(59,163,214,.4);
      font-size: 1.1rem; cursor: pointer;
      opacity: 0; transform: translateY(12px);
      transition: opacity .3s, transform .3s, background .2s;
      z-index: 500;
    }
    #back-to-top.visible { opacity: 1; transform: translateY(0); }
    #back-to-top:hover { background: var(--sky, #1a6eb5); }

    /* Toast */
    #toast-container {
      position: fixed; bottom: 28px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; gap: 10px;
      z-index: 9998; pointer-events: none;
    }
    .toast {
      padding: 13px 28px; border-radius: 2px;
      font-size: .88rem; font-weight: 500;
      letter-spacing: .04em; color: #fff;
      opacity: 0; transform: translateY(10px);
      transition: opacity .3s, transform .3s;
      pointer-events: none;
    }
    .toast--show { opacity: 1; transform: translateY(0); }
    .toast--success { background: var(--ocean, #0d3b6e); }
    .toast--error   { background: #c0392b; }
    .toast--info    { background: #555; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ─── 10. UPDATING TIME IN FOOTER─────────────── */
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
