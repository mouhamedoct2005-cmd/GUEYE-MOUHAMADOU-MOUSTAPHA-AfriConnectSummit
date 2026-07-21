# AfriConnect Summit 2026

Site vitrine fictif pour un sommet tech panafricain se tenant à Dakar, Sénégal (15-17 octobre 2026). Projet réalisé dans le cadre de l'examen individuel de Technologie Web.

## À propos

AfriConnect Summit 2026 est un événement fictif qui réunit développeurs, entrepreneurs et investisseurs de tout le continent africain autour de l'innovation technologique (IA, Cloud, Fintech, Design, Data). Ce site présente l'événement, son programme, ses intervenants, et permet de s'y inscrire.

## Technologies utilisées

- **HTML5** — structure sémantique
- **CSS3** — vanilla, un seul fichier externe (`css/style.css`), variables CSS, Flexbox, Grid, responsive design
- **JavaScript** — vanilla, aucun framework ni librairie externe
- **Git & GitHub** — versionnage et hébergement (GitHub Pages)

Aucun framework JS, aucune librairie CSS (Bootstrap, jQuery, etc.) n'a été utilisé — uniquement Bootstrap Icons pour les pictogrammes et Google Fonts (Inter + Syne) pour la typographie.

## Structure du projet

```
racine/
├── index.html          # Page d'accueil
├── programme.html       # Programme de la conférence (3 jours, onglets)
├── intervenants.html    # Liste des intervenants avec filtres
├── contact.html         # Formulaire d'inscription + FAQ + carte
├── css/
│   └── style.css        # Feuille de style unique
├── js/
│   └── main.js          # Script unique
├── images/               # Photos, logos, visuels
└── README.md
```

## Fonctionnalités

- Mode sombre / clair avec persistance (`localStorage`)
- Navbar dynamique (effet vitre dépolie au scroll, masquage au scroll vers le bas)
- Menu hamburger responsive (mobile/tablette)
- Animations d'apparition au scroll (`IntersectionObserver`)
- Compte à rebours en temps réel vers la date de l'événement
- Compteurs de statistiques animés
- Onglets pour naviguer entre les 3 jours du programme
- Filtrage dynamique des intervenants par catégorie (sans rechargement)
- Formulaire d'inscription avec validation en temps réel (JS)
- FAQ en accordéon (CSS pur, sans JS)
- Bouton retour en haut de page
- Année du footer mise à jour automatiquement
- Fond animé façon ciel étoilé, adapté au thème actif

## Aperçu du site

Ouvrir `index.html` dans un navigateur, ou consulter la version en ligne :  https://mouhamedoct2005-cmd.github.io/GUEYE-MOUHAMADOU-MOUSTAPHA-AfriConnectSummit/

## Auteur

MOUHAMADOU MOUSTAPHA GUEYE — Étudiant en RESEAU TELECOM, examen individuel de Technologie Web