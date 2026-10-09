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


const budget = document.getElementById("budget");
const budgetValue = document.getElementById("budgetValue");
const contactForm = document.querySelector("#contactForm");
const successMessage = document.querySelector("#successMessage");
const dateTime = document.querySelector("#dateTime");

function updateSlider() {
    budgetValue.textContent = "$" + budget.value;

    const min = Number(budget.min);
    const max = Number(budget.max);
    const value = Number(budget.value);

    const percent = (value - min) / (max - min);
    const sliderWidth = budget.offsetWidth;
    const thumbOffset = 16;

    const position = percent * (sliderWidth - thumbOffset) + thumbOffset / 2;

    budgetValue.style.left = (budget.offsetLeft + position) + "px";
}

budget.addEventListener("input", updateSlider);

updateSlider();

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let fullName = document.querySelector("#fullName").value.trim();
    let email = document.querySelector("#email").value.trim();
    let roomInterest = document.querySelector("#roomInterest").value;
    let checkin = document.querySelector("#checkin").value;
    let checkout = document.querySelector("#checkout").value;
    let message = document.querySelector("#message").value.trim();

    if (fullName.length < 3) {
        alert("Name must be more than 3 characters.");
        return;
    }

    if (email === "" || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (roomInterest === "") {
        alert("Please select a room interest.");
        return;
    }

    if (checkin === "" || checkout === "") {
        alert("Please select both check-in and check-out dates.");
        return;
    }

    if (message === "") {
        alert("Please enter a message.");
        return;
    }

    successMessage.innerText = "Inquiry submitted successfully!";
});

contactForm.addEventListener("reset", function () {
    setTimeout(() => {
        updateSlider();   
    }, 0);

    successMessage.innerText = ""; 
});

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    dateTime.innerText = "Last Updated: " + date + " | " + time;
}

updateDateTime();
setInterval(updateDateTime, 1000);