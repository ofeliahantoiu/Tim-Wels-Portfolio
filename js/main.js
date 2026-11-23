"use strict";

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
    if (window.innerWidth > 700) closeMenu();
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
