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
    /* ANNÉE DYNAMIQUE DANS LE FOOTER */
const yearEl = document.getElementById("currentYear");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
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

/* VALIDATION DU FORMULAIRE (contact.html) */
const form = document.getElementById("registrationForm");

if (form) {
  const fields = {
    fullName: {
      el: document.getElementById("fullName"),
      validate: (v) => v.trim().length >= 3,
      message: "Veuillez entrer un nom complet valide (min. 3 caractères).",
    },
    email: {
      el: document.getElementById("email"),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: "Veuillez entrer une adresse email valide.",
    },
    phone: {
      el: document.getElementById("phone"),
      validate: (v) => v.replace(/\D/g, "").length >= 8,
      message: "Le numéro doit contenir au moins 8 chiffres.",
    },
    ticketType: {
      el: document.getElementById("ticketType"),
      validate: (v) => v !== "",
      message: "Veuillez choisir un type de participation.",
    },
    country: {
      el: document.getElementById("country"),
      validate: (v) => v !== "",
      message: "Veuillez choisir votre pays d'origine.",
    },
    motivation: {
      el: document.getElementById("motivation"),
      validate: (v) => v.trim().length >= 20,
      message: "Merci de détailler votre motivation (min. 20 caractères).",
    },
  };

  function validateField(field) {
    const { el, validate, message } = field;
    if (!el) return true;
    const group = el.closest(".form-group");
    const errorEl = group.querySelector(".error-msg");
    const isValid = validate(el.value);

    group.classList.toggle("valid", isValid);
    group.classList.toggle("invalid", !isValid);
    if (errorEl) errorEl.textContent = isValid ? "" : message;

    return isValid;
  }

  // Validation en temps réel
  Object.values(fields).forEach((field) => {
    if (!field.el) return;
    const eventType = field.el.tagName === "SELECT" ? "change" : "input";
    field.el.addEventListener(eventType, () => validateField(field));
    field.el.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allValid = true;
    Object.values(fields).forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      const firstInvalid = form.querySelector(".invalid input, .invalid select, .invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Succès : affichage du message, réinitialisation du formulaire
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.classList.add("show");
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.reset();
    Object.values(fields).forEach((field) => {
      if (!field.el) return;
      const group = field.el.closest(".form-group");
      group.classList.remove("valid", "invalid");
    });

    setTimeout(() => {
      if (successMessage) successMessage.classList.remove("show");
    }, 6000);
  });
}

/* CIEL ÉTOILÉ ANIMÉ — compatible thème clair/sombre */
const starCanvas = document.getElementById("starfield");

if (starCanvas) {
  const ctx = starCanvas.getContext("2d");
  let stars = [];
  let t = 0;

  function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    generateStars();
  }

  function generateStars() {
    const density = 0.0009; // Ajustez la densité des étoiles ici
    const count = Math.floor(starCanvas.width * starCanvas.height * density);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,

      
      radius: Math.random() * 1.4 + 0.3,
      baseOpacity: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.05 + 0.01,
      accent: Math.random() < 0.20,
    }));
  }

  function getPalette() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  if (isDark) {
    return {
      sky1: "#0b0e1a",
      sky2: "#141a30",
      star: "255, 255, 255",
      accent: "255, 61, 129"
    };
  }

  return {
    sky1: "#f4f5f9",
    sky2: "#e7e9f2",
    star: "255, 105, 180",
    accent: "255, 61, 129"
  };
}

  function drawStars() {
    const { sky1, sky2, star, accent } = getPalette();

    const gradient = ctx.createLinearGradient(0, 0, 0, starCanvas.height);
    gradient.addColorStop(0, sky1);
    gradient.addColorStop(1, sky2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, starCanvas.width, starCanvas.height);

    stars.forEach((s) => {
      const twinkle = Math.sin(t * s.twinkleSpeed + s.phase) * 0.35;
      const opacity = Math.max(0, Math.min(1, s.baseOpacity + twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.accent ? accent : star}, ${opacity})`;
      ctx.fill();

      s.y += s.drift;
      if (s.y > starCanvas.height) s.y = 0;
    });

    t++;
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  drawStars();
}