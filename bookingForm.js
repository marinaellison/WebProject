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

function bookRoom(event) {
    if (event) {
        event.preventDefault();
    }

    let name = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let room = document.getElementById("preferredRoom").value;
    let guestNumber = document.getElementById("guestNumber").value.trim();
    let checkIn = document.getElementById("checkInDay").value;
    let checkOut = document.getElementById("checkOutDay").value;
    let payment = document.getElementById("payment").value.trim();
    let address = document.getElementById("address").value.trim();
    let expiryDate = document.getElementById("expiryDate").value.trim();
    let cvv = document.getElementById("CVV").value.trim();

    if (
        name === "" ||
        lname === "" ||
        email === "" ||
        payment === "" ||
        address === "" ||
        expiryDate === "" ||
        cvv === "" ||
        guestNumber === "" ||
        checkIn === "" ||
        checkOut === ""
    ) {
        document.getElementById("successMessage").innerHTML = "Please fill out all required fields before submitting your booking.";
        return;
    }

    if (checkOut <= checkIn) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    document.getElementById("successMessage").innerHTML =
        "Hello, " + name + " " + lname +
        ", your booking has been submitted successfully! We have received your booking from " +
        checkIn + " to " + checkOut +
        " in our " + room +
        " for " + guestNumber +
        " guest(s). A confirmation email will be sent to " + email + ".";
}

/* LAST UPDATED DATE */
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