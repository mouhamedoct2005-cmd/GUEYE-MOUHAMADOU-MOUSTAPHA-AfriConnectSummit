document.addEventListener("DOMContentLoaded", () => {
    /* --------------------------------------------------------------------
       MODE SOMBRE — bascule + persistance via localStorage
       -------------------------------------------------------------------- */
    const themeToggle = document.getElementById("themeToggle");
    const htmlEl = document.documentElement;
    const THEME_KEY = "africonnect-theme";

    function applyTheme(theme) {
        htmlEl.setAttribute("data-theme", theme);
        if (themeToggle) {
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
            }
        }
    }

    // Au chargement : préférence sauvegardée, sinon préférence système
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    const hamburger = document.getElementById("hamburgerMenu");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    hamburger.querySelector("i").className = isOpen ? "bi bi-x-lg" : "bi bi-list";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.querySelector("i").className = "bi bi-list";
    });
  });
}
});



// ======================JS POUR LE CHANGEMENT DE JOUR=========================

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Désactive tous les onglets et panneaux
        tabButtons.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
        });
        tabPanels.forEach((panel) => {
            panel.classList.remove("active");
            panel.setAttribute("hidden", "");
        });

        // Active celui cliqué
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const targetPanel = document.getElementById(btn.getAttribute("aria-controls"));
        if (targetPanel) {
            targetPanel.classList.add("active");
            targetPanel.removeAttribute("hidden");
        }
    });
});

/* ===================NAVBAR DYNAMIC et HAMBURGER======================== */

/* NAVBAR DYNAMIQUE — vitre dépolie après 80px + masquage au scroll vers le bas */
const mainHeader = document.querySelector(".main-header");
let lastScrollY = window.scrollY;

function handleHeaderScroll() {
  if (!mainHeader) return;
  const currentScrollY = window.scrollY;

  // Fond flouté après 80px
  mainHeader.classList.toggle("scrolled", currentScrollY > 80);

  // Masque la navbar en descendant, la réaffiche en remontant
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    mainHeader.classList.add("nav-hidden");
  } else {
    mainHeader.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
}
handleHeaderScroll();
window.addEventListener("scroll", handleHeaderScroll);





// ==========================COMPTEUR DINAMIC ET CONTAREBOUR DATE===========================


