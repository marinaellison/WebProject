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


function showAmenity(event, type) {
    const popup = document.getElementById("popupBox");
    
    const data = {
        spa: {
            image: "assets/images/spa.png",
            title: "Navasana Spa",
            desc: "Escape the ordinary",
            hours: "Hours: 9:00 AM - 8:00 PM",
            includes: "Includes: Massages, facials, sauna access, and wellness treatments."
        },
        gym: {
            image: "assets/images/gym.png",
            title: "Fitness Center",
            desc: "Modern and spacious center, equipped with the latest facilities",
            hours: "Hours: 6:00 AM - 10:00 PM",
            includes: "Includes: Cardio machines, weights, and outdoor training space, as well as tennis and padel courts."
        },
        plantationClub: {
            image: "assets/images/plantationClub.png",
            title: "The Plantation Club",
            desc: "A stylish and relaxing club area for guests to enjoy premium comfort and social space",
            hours: "Hours: 10:00 AM - 10:00 PM",
            includes: "Includes: Lounge seating, drinks, and private club access."
        },
        gardenPool: {
            image: "assets/images/gardenPool.png",
            title: "Garden Pool",
            desc: "A quiet pool surrounded by greenery for a peaceful and refreshing experience",
            hours: "Hours: 8:00 AM - 8:00 PM",
            includes: "Includes: Pool access, sunbeds, and towel service."
        },
        beachRestaurant: {
            image: "assets/images/beachRestaurant.png",
            title: "Edgewater Beach Restaurant",
            desc: "A scenic beachfront restaurant with fresh meals and relaxing ocean views",
            hours: "Hours: 11:00 AM - 10:00 PM",
            includes: "Includes: Seafood, local dishes, drinks, and beachside seating."
        },
        allDayRestaurant: {
            image: "assets/images/allDayRestaurant.png",
            title: "Mercado- All Day Restaurant",
            desc: "A convenient dining area serving meals throughout the day for all guests",
            hours: "Hours: 7:00 AM - 10:00 PM",
            includes: "Includes: Breakfast buffet, lunch, dinner, and beverages."
        },
        bar: {
            image: "assets/images/bar.png",
            title: "Bar Bleu",
            desc: "A modern bar serving refreshing drinks and cocktails in a vibrant setting",
            hours: "Hours: 4:00 PM - 12:00 AM",
            includes: "Includes: Cocktails, mocktails, snacks, and lounge seating."
        },
        mainPool: {
            image: "assets/images/mainPool.png",
            title: "Main Pool",
            desc: "The main resort pool offering a lively atmosphere and beautiful open space",
            hours: "Hours: 8:00 AM - 9:00 PM",
            includes: "Includes: Pool access, loungers, umbrellas, and towels."
        }
    };

    document.getElementById("popupImage").src = data[type].image;
    document.getElementById("popupImage").alt = data[type].title;
    document.getElementById("popupTitle").innerText = data[type].title;
    document.getElementById("popupDesc").innerText = data[type].desc;
    document.getElementById("popupHours").innerText = data[type].hours;
    document.getElementById("popupIncludes").innerText = data[type].includes;

    popup.style.display = "block";
    
    // GET CLICK POSITION
    let x = event.clientX;
    let y = event.clientY;

    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;

    // Default → show on right
    let left = x + 15;
    let top = y + 15;

    // If popup too close to right edge → flip to left
    if (left + popupWidth > window.innerWidth) {
        left = x - popupWidth - 15;
    }

    // If popup too close to bottom → move upwards
    if (top + popupHeight > window.innerHeight) {
        top = y - popupHeight - 15;
    }

    // KEEP INSIDE SCREEN 
    if (left < 10) {
        left = 10;
    }
    if (top < 10) {
        top = 10;
    }

    // APPLY POSITION
    popup.style.left = left + "px";
    popup.style.top = top + "px";
}

function closePopup() {
    document.querySelector("#popupBox").style.display = "none";
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



