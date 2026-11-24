"use strict";

const themeButton = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "tim-wels-theme";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  if (themeLabel) themeLabel.textContent = isDark ? "Licht" : "Donker";
  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Schakel naar lichte modus" : "Schakel naar donkere modus");
  }
  if (themeMeta) themeMeta.setAttribute("content", isDark ? "#0f1b25" : "#f6f5f0");
}

applyTheme(document.documentElement.dataset.theme);
if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem(themeStorageKey, nextTheme); } catch { /* Storage may be unavailable. */ }
  });
}

const cvDialog = document.querySelector("#cv-dialog");
const cvFrame = document.querySelector(".cv-frame");
const cvCloseButton = document.querySelector("[data-close-cv]");

if (cvDialog && typeof cvDialog.showModal === "function") {
  document.querySelectorAll("[data-open-cv]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (!cvDialog.open) {
        if (cvFrame) cvFrame.src = cvFrame.dataset.src;
        cvDialog.showModal();
      }
    });
  });
  if (cvCloseButton) cvCloseButton.addEventListener("click", () => cvDialog.close());
  cvDialog.addEventListener("click", (event) => {
    if (event.target === cvDialog) cvDialog.close();
  });
  cvDialog.addEventListener("close", () => {
    if (cvFrame) cvFrame.removeAttribute("src");
  });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigatiemenu");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    menuButton.setAttribute("aria-label", shouldOpen ? "Sluit navigatiemenu" : "Open navigatiemenu");
    navigation.classList.toggle("open", shouldOpen);
    document.body.classList.toggle("menu-open", shouldOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const copyButton = document.querySelector("[data-copy-email]");
if (copyButton) {
  let resetTimeout;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("t.wels@student.fontys.nl");
      copyButton.textContent = "E-mailadres gekopieerd!";
    } catch {
      copyButton.textContent = "Selecteer en kopieer het adres hierboven";
    }
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      copyButton.textContent = "Kopieer e-mailadres";
    }, 3500);
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-animate");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

if ("IntersectionObserver" in window) {
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".primary-nav a[href^='#']"));
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-25% 0px -60% 0px" }
  );
  sections.forEach((section) => activeObserver.observe(section));
}
