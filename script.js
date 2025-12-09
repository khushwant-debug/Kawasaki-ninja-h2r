// script.js
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  /* ---------------------------
     Scroll reveal for sections
  ----------------------------*/
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  function handleScrollReveal() {
    const triggerPoint = window.innerHeight * 0.85;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }
    });
  }

  // Run once on load and then on scroll
  handleScrollReveal();
  window.addEventListener("scroll", handleScrollReveal);

  /* ---------------------------
     Navbar shadow on scroll
  ----------------------------*/
  function handleNavShadow() {
    if (!nav) return;
    if (window.scrollY > 12) {
      nav.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.9)";
    } else {
      nav.style.boxShadow = "none";
    }
  }

  handleNavShadow();
  window.addEventListener("scroll", handleNavShadow);

  /* ---------------------------
     Active nav link by page
  ----------------------------*/
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      // Highlight current page link
      link.style.color = "#ffffff";
      link.style.borderBottomColor = "#00ff7b";
      link.style.fontWeight = "700";
    }
  });

  /* ---------------------------
     Smooth scroll for same-page anchors (if you add #ids later)
  ----------------------------*/
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - (nav ? nav.offsetHeight : 0),
          behavior: "smooth"
        });
      }
    });
  });
});
/* =========================
   H2R SOUND BUTTON LOGIC
   ========================= */
const soundBtn = document.getElementById("soundBtn");
const h2rAudio = document.getElementById("h2rAudio");

if (soundBtn && h2rAudio) {
  soundBtn.addEventListener("click", () => {
    if (h2rAudio.paused) {
      h2rAudio.currentTime = 0;
      h2rAudio.play();
      soundBtn.classList.add("playing");
      soundBtn.textContent = "■ Stop H2R Sound";
    } else {
      h2rAudio.pause();
      h2rAudio.currentTime = 0;
      soundBtn.classList.remove("playing");
      soundBtn.textContent = "▶ Play H2R Raw Sound";
    }
  });

  // When sound ends naturally
  h2rAudio.addEventListener("ended", () => {
    soundBtn.classList.remove("playing");
    soundBtn.textContent = "▶ Play H2R Raw Sound";
  });
}

/* =========================
   GALLERY LIGHTBOX
   ========================= */
const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightboxImg.src = "";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
      lightboxImg.src = "";
    }
  });
}
