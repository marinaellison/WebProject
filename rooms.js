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

/* ROOM DATA */
const rooms = [
    {
        id: "deluxe",
        element: document.querySelector(".col-1-1"),
        type: "deluxe",
        guests: "1-2",
        price: 120
    },
    {
        id: "executive",
        element: document.querySelector(".col-1-2"),
        type: "executive",
        guests: "3-4",
        price: 150
    },
    {
        id: "presidential",
        element: document.querySelector(".col-1-3"),
        type: "presidential",
        guests: "3-4",
        price: 180
    },
    {
        id: "family",
        element: document.querySelector(".col-1-4"),
        type: "family",
        guests: "4+",
        price: 225
    }
];

/* CATEGORY BAR */
const categoryItems = document.querySelectorAll("#categorybar h2");

categoryItems.forEach(item => {
    item.style.cursor = "pointer";

    item.addEventListener("click", function () {
        const text = this.textContent.trim();

        // remove previous active state
        categoryItems.forEach(cat => cat.classList.remove("active-category"));
        this.classList.add("active-category");

        // reset form selections when category bar is used
        document.getElementById("filters").reset();
        document.getElementById("pricerange").value = 150;

        if (text === "All Rooms") {
            showAllRooms();
        } else if (text === "1-2 Guest Rooms") {
            filterByCategory("1-2");
        } else if (text === "3-4 Guest Rooms") {
            filterByCategory("3-4");
        } else if (text === "4+ Guest Rooms") {
            filterByCategory("4+");
        }
    });
});

function filterByCategory(category) {
    rooms.forEach(room => {
        if (!room.element) return;
        room.element.style.display = room.guests === category ? "block" : "none";
    });
}

function showAllRooms() {
    rooms.forEach(room => {
        if (!room.element) return;
        room.element.style.display = "block";
    });
}

/* BOOK ROOM */
function bookRoom() {
    window.open("bookingForm.html", "_blank");
}

/* FILTER HELPERS */
function getSelectedRoomTypes() {
    const selectedTypes = [];

    if (document.getElementById("deluxe").checked) selectedTypes.push("deluxe");
    if (document.getElementById("executive").checked) selectedTypes.push("executive");
    if (document.getElementById("presidential").checked) selectedTypes.push("presidential");
    if (document.getElementById("family").checked) selectedTypes.push("family");

    return selectedTypes;
}

function getSelectedGuestRange() {
    if (document.getElementById("uptotwo").checked) return "1-2";
    if (document.getElementById("uptofour").checked) return "3-4";
    if (document.getElementById("fourplus").checked) return "4+";
    return null;
}

function getSelectedMaxPrice() {
    return Number(document.getElementById("pricerange").value);
}

/* MAIN FILTER FUNCTION */
function updateRoomDisplay() {
    const selectedTypes = getSelectedRoomTypes();
    const selectedGuests = getSelectedGuestRange();
    const maxPrice = getSelectedMaxPrice();

    rooms.forEach(room => {
        if (!room.element) return;

        const matchesType =
            selectedTypes.length === 0 || selectedTypes.includes(room.type);

        const matchesGuests =
            !selectedGuests || room.guests === selectedGuests;

        const matchesPrice =
            room.price <= maxPrice;

        if (matchesType && matchesGuests && matchesPrice) {
            room.element.style.display = "block";
        } else {
            room.element.style.display = "none";
        }
    });
}

/* BUTTON FUNCTIONS */
function applyRoomType() {
    categoryItems.forEach(cat => cat.classList.remove("active-category"));
    updateRoomDisplay();
}

function applyFilters() {
    categoryItems.forEach(cat => cat.classList.remove("active-category"));
    updateRoomDisplay();
}

function clearAll() {
    document.getElementById("filters").reset();
    document.getElementById("pricerange").value = 200;
    categoryItems.forEach(cat => cat.classList.remove("active-category"));
    showAllRooms();
}

/* SLIDER FILTERING */
const priceSlider = document.getElementById("pricerange");
if (priceSlider) {
    priceSlider.addEventListener("input", updateRoomDisplay);
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





