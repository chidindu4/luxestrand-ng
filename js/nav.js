const navbar = document.querySelector(".navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("primaryNav");
const navOverlay = document.getElementById("navOverlay");
const navClose = document.getElementById("navClose");

if (navbar && navToggle && navLinks && navOverlay) {
  let lastScrollY = window.scrollY;
  let ticking = false;
  const revealOffset = 32;
  const scrollDelta = 3;

  const closeNav = () => {
    navbar.classList.remove("nav-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    navbar.classList.add("nav-open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    if (navbar.classList.contains("nav-open")) {
      closeNav();
      return;
    }
    openNav();
  });

  navOverlay.addEventListener("click", closeNav);
  if (navClose) navClose.addEventListener("click", closeNav);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar.classList.contains("nav-open")) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && navbar.classList.contains("nav-open")) {
      closeNav();
    }
  });

  const updateHeaderOnScroll = () => {
    const currentY = window.scrollY;
    const cartPinned = document.body.classList.contains("cart-active");

    // Keep header visible while menu is open or cart has active items.
    if (navbar.classList.contains("nav-open") || cartPinned) {
      navbar.classList.remove("nav-hidden");
      navbar.classList.remove("nav-reveal");
      lastScrollY = currentY;
      ticking = false;
      return;
    }

    if (currentY <= 0) {
      navbar.classList.remove("nav-hidden", "nav-reveal");
      lastScrollY = currentY;
      ticking = false;
      return;
    }

    const diff = currentY - lastScrollY;

    if (diff > scrollDelta && currentY > revealOffset) {
      navbar.classList.add("nav-hidden");
      navbar.classList.remove("nav-reveal");
    } else if (diff < -scrollDelta) {
      navbar.classList.remove("nav-hidden");
      navbar.classList.add("nav-reveal");
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderOnScroll);
    },
    { passive: true },
  );

  window.addEventListener("cartstatechange", () => {
    const cartPinned = document.body.classList.contains("cart-active");
    if (cartPinned) {
      navbar.classList.remove("nav-hidden", "nav-reveal");
      return;
    }

    if (window.scrollY <= 0) {
      navbar.classList.remove("nav-hidden", "nav-reveal");
    }
  });
}
