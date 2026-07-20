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
    // =================hamburger menu========================
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

    // ==================Animation au scroll========================
    /* ANIMATIONS AU SCROLL — IntersectionObserver */
    const animatedEls = document.querySelectorAll(
        ".section-scroll-animate, .zoom-in, .slide-in-left"
    );

    if (animatedEls.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        animatedEls.forEach((el) => observer.observe(el));
    }
    /* BOUTON RETOUR EN HAUT — visible après 300px */
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    function handleScrollTopVisibility() {
        if (!scrollTopBtn) return;
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    }
    handleScrollTopVisibility();
    window.addEventListener("scroll", handleScrollTopVisibility);

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
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

/* ===================NAVBAR DYNAMIC ======================== */

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


/* FILTRAGE DES INTERVENANTS — sans rechargement de page (intervenants.html) */
const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll("#speakersGrid .speaker-card");

if (filterButtons.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Un seul bouton actif à la fois
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      speakerCards.forEach((card) => {
        const match = category === "all" || card.getAttribute("data-category") === category;
        card.classList.toggle("hidden", !match);
      });
    });
  });
}





// ==========================COMPTEUR DINAMIC ET CONTAREBOUR DATE===========================

// ===============================
// Compte à rebours de l'événement
// ===============================

const blocCompte = document.querySelector("#countdown");

if (blocCompte) {

    const dateEvenement = new Date(2026, 9, 15, 8, 30, 0); // 15 octobre 2026 à 08h30

    function afficherTemps() {

        const maintenant = new Date();
        const ecart = dateEvenement - maintenant;

        if (ecart <= 0) {
            blocCompte.innerHTML = "<p>L'événement a commencé !</p>";
            clearInterval(timer);
            return;
        }

        const jour = Math.floor(ecart / (1000 * 60 * 60 * 24));
        const heure = Math.floor((ecart / (1000 * 60 * 60)) % 24);
        const minute = Math.floor((ecart / (1000 * 60)) % 60);
        const seconde = Math.floor((ecart / 1000) % 60);

        document.getElementById("days").textContent = jour.toString().padStart(2, "0");
        document.getElementById("hours").textContent = heure.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minute.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconde.toString().padStart(2, "0");
    }

    afficherTemps();

    const timer = setInterval(afficherTemps, 1000);
}

// Animation des compteurs lorsque la section devient visible

const compteurs = document.querySelectorAll(".stat-number[data-target]");

if (compteurs.length) {

    const observateur = new IntersectionObserver((elements) => {

        elements.forEach((element) => {

            if (!element.isIntersecting) return;

            const compteur = element.target;
            const objectif = Number(compteur.dataset.target);

            let debut = null;
            const duree = 1500;

            function animer(temps) {

                if (!debut) {
                    debut = temps;
                }

                const ecoule = temps - debut;
                const progression = Math.min(ecoule / duree, 1);

                compteur.textContent =
                    "+" + Math.floor(objectif * progression).toLocaleString("fr-FR");

                if (progression < 1) {
                    requestAnimationFrame(animer);
                } else {
                    compteur.textContent =
                        "+" + objectif.toLocaleString("fr-FR");
                }
            }

            requestAnimationFrame(animer);

            observateur.unobserve(compteur);

        });

    }, {
        threshold: 0.5
    });

    compteurs.forEach((compteur) => {
        observateur.observe(compteur);
    });

}

