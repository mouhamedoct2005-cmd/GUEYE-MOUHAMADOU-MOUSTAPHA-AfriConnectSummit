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
});