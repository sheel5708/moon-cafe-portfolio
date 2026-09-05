/* =========================
MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
      menuToggle.textContent = "✕";
    } else {
      menuToggle.textContent = "☰";
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}

/* =========================
MENU FILTER
========================= */

const categoryButtons = document.querySelectorAll(".category");
const menuCards = document.querySelectorAll(".menu-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const selectedCategory = button.dataset.category;

    menuCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* =========================
RESERVATION FORM
========================= */

const reservationForm = document.getElementById("reservationForm");
const toast = document.getElementById("toast");
const dateInput = document.getElementById("date");

const reserveLinks = document.querySelectorAll(".reserve-link");

reserveLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const reservationSection = document.getElementById("reservation");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput = document.getElementById("name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    }
  });
});

if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;
}

if (reservationForm && toast && dateInput) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const peopleInput = document.getElementById("people");
    const dateField = document.getElementById("date");
    const timeField = document.getElementById("time");

    const name = nameInput.value.trim();
    const people = peopleInput.value.trim();
    const dateValue = dateField.value;
    const timeValue = timeField.value;

    if (!name || !people || !dateValue || !timeValue) {
      reservationForm.reportValidity();
      return;
    }

    const formattedDate = new Date(`${dateValue}T00:00:00`);
    const dateLabel = formattedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const toastTitle = toast.querySelector("strong");
    const toastMessage = toast.querySelector("small");

    toastTitle.textContent = "Reservation request sent!";
    toastMessage.textContent = `Thanks ${name}, we’ve saved a table for ${people} on ${dateLabel} at ${timeValue}.`;

    toast.classList.add("show");
    reservationForm.reset();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;

    setTimeout(() => {
      toast.classList.remove("show");
      toastTitle.textContent = "Reservation received!";
      toastMessage.textContent = "We'll see you under the moon.";
    }, 4000);
  });
}

/* =========================
NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.style.background = "rgba(9, 9, 13, 0.94)";
    } else {
      navbar.style.background = "rgba(9, 9, 13, 0.82)";
    }
  });
}

/* =========================
ACTIVE NAV STATE
========================= */

const sectionLinks = document.querySelectorAll(".nav-links a:not(.nav-btn)");
const sections = document.querySelectorAll("main section[id]");

if (sectionLinks.length && sections.length) {
  const setActiveNavLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        sectionLinks.forEach((link) => {
          const target = link.getAttribute("href");
          if (target === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  setActiveNavLink();
  window.addEventListener("scroll", setActiveNavLink, { passive: true });
}

/* =========================
SIMPLE SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".menu-card, .feature, .about-content, .about-visual, .reservation-form"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(element);
  });
}
