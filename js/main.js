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

/* ============================================================
   9. VALIDATION DU FORMULAIRE DE CONTACT
   - Tous les champs requis vérifiés
   - Format email vérifié par regex
   - Longueur minimum du message (20 caractères)
   - Messages d'erreur sous chaque champ
   - Message de succès après soumission
   - Fonctionne sur contact.html uniquement
   ============================================================ */

// On sélectionne le bouton d'envoi
const btnEnvoyer = document.getElementById('submitBtn');

// On vérifie qu'on est bien sur la page contact
if (btnEnvoyer) {

  // --- Fonction utilitaire : afficher une erreur ---
  function afficherErreur(idChamp, message) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      // Bordure rouge sur le champ
      champ.classList.remove('is-valid');
      champ.classList.add('is-invalid');
    }

    if (erreur) {
      // On affiche le message d'erreur
      erreur.textContent = message;
    }
  }

  // --- Fonction utilitaire : afficher un succès ---
  function afficherSucces(idChamp) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      // Bordure verte sur le champ
      champ.classList.remove('is-invalid');
      champ.classList.add('is-valid');
    }

    if (erreur) {
      // On efface le message d'erreur
      erreur.textContent = '';
    }
  }

  // --- Fonction utilitaire : réinitialiser un champ ---
  function reinitialiserChamp(idChamp) {

    const champ = document.getElementById(idChamp);
    const erreur = document.getElementById(idChamp + '-error');

    if (champ) {
      champ.classList.remove('is-valid', 'is-invalid');
    }

    if (erreur) {
      erreur.textContent = '';
    }
  }

  // --- Fonction principale : valider le formulaire ---
  function validerFormulaire() {

    // On suppose que le formulaire est valide
    let formulaireValide = true;

    // ---- Validation du champ NOM ----
    
const nom = document.getElementById('nom');

// Regex qui accepte uniquement les lettres (accents compris), espaces et tirets
const regexNom = /^[a-zA-ZÀ-ÿ\s\-']+$/;

if (nom) {
  if (nom.value.trim() === '') {
    afficherErreur('nom', 'Le nom est obligatoire.');
    formulaireValide = false;
  } else if (nom.value.trim().length < 2) {
    afficherErreur('nom', 'Le nom doit contenir au moins 2 caractères.');
    formulaireValide = false;
  } else if (!regexNom.test(nom.value.trim())) {
    afficherErreur('nom', 'Le nom ne doit contenir que des lettres.');
    formulaireValide = false;
  } else {
    afficherSucces('nom');
  }
}

    // ---- Validation du champ PRÉNOM ----
    
const prenom = document.getElementById('prenom');

// Même regex que le nom
const regexPrenom = /^[a-zA-ZÀ-ÿ\s\-']+$/;

if (prenom) {
  if (prenom.value.trim() === '') {
    afficherErreur('prenom', 'Le prénom est obligatoire.');
    formulaireValide = false;
  } else if (prenom.value.trim().length < 2) {
    afficherErreur('prenom', 'Le prénom doit contenir au moins 2 caractères.');
    formulaireValide = false;
  } else if (!regexPrenom.test(prenom.value.trim())) {
    afficherErreur('prenom', 'Le prénom ne doit contenir que des lettres.');
    formulaireValide = false;
  } else {
    afficherSucces('prenom');
  }
}

    // ---- Validation du champ EMAIL ----
    const email = document.getElementById('email');

    if (email) {

      // Regex pour vérifier le format de l'email
      // ex: exemple@domaine.com
      const regexEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

      if (email.value.trim() === '') {
        afficherErreur('email', "L'email est obligatoire.");
        formulaireValide = false;
      } else if (!regexEmail.test(email.value.trim())) {
        afficherErreur('email', "Le format de l'email est invalide. Ex: nom@domaine.com");
        formulaireValide = false;
      } else {
        afficherSucces('email');
      }
    }

    // ---- Validation du champ SUJET ----
    const sujet = document.getElementById('sujet');

    if (sujet) {
      if (sujet.value === '' || sujet.value === null) {
        afficherErreur('sujet', 'Veuillez choisir un sujet.');
        formulaireValide = false;
      } else {
        afficherSucces('sujet');
      }
    }

    // ---- Validation du champ MESSAGE ----
    const message = document.getElementById('message');

    if (message) {
      if (message.value.trim() === '') {
        afficherErreur('message', 'Le message est obligatoire.');
        formulaireValide = false;
      } else if (message.value.trim().length < 20) {
        afficherErreur('message',
          'Le message doit contenir au moins 20 caractères. ' +
          '(' + message.value.trim().length + '/20)'
        );
        formulaireValide = false;
      } else {
        afficherSucces('message');
      }
    }

    return formulaireValide;
  }

  // --- Écoute du clic sur le bouton Envoyer ---
  btnEnvoyer.addEventListener('click', function() {

    // On lance la validation
    const estValide = validerFormulaire();

    // Si tout est valide
    if (estValide) {

      // On affiche le message de succès
      const msgSucces = document.getElementById('successMsg');

      if (msgSucces) {
        msgSucces.style.display = 'block';
        msgSucces.classList.remove('d-none');
      }

      // On désactive le bouton pour éviter un double envoi
      btnEnvoyer.disabled = true;
      btnEnvoyer.textContent = '✓ Message envoyé !';

      // On réinitialise tous les champs après 4 secondes
      setTimeout(function() {

        // Réinitialisation des champs
        const champs = ['nom', 'prenom', 'email', 'sujet', 'message'];
        champs.forEach(function(id) {
          const champ = document.getElementById(id);
          if (champ) {
            champ.value = '';
            reinitialiserChamp(id);
          }
        });

        // On cache le message de succès
        if (msgSucces) {
          msgSucces.style.display = 'none';
        }

        // On réactive le bouton
        btnEnvoyer.disabled = false;
        btnEnvoyer.innerHTML = '<i class="bi bi-send-fill me-2"></i> Envoyer le message';

      }, 4000);
    }
  });

  // --- Validation en temps réel ---
  // Les erreurs disparaissent dès que l'utilisateur corrige

  const champsAValider = ['nom', 'prenom', 'email', 'sujet', 'message'];

  champsAValider.forEach(function(id) {

    const champ = document.getElementById(id);

    if (champ) {
      // On écoute la saisie en temps réel
      champ.addEventListener('input', function() {

        // Si le champ n'est plus vide, on retire l'erreur
        if (champ.value.trim() !== '') {
          reinitialiserChamp(id);
        }
      });
    }
  });

} // fin if btnEnvoyer

