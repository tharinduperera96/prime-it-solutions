document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const pageKey = body.className.replace("page-", "") || document.documentElement.dataset.page;
  const navLinks = document.querySelectorAll(".main-nav a[data-page]");
  navLinks.forEach((link) => {
    if (link.dataset.page === pageKey) {
      link.classList.add("active");
    }
  });

  // Mobile nav toggle
  const nav = document.querySelector(".main-nav");
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Scroll‑in animations
  const animated = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  animated.forEach((el) => observer.observe(el));

  // Futuristic cursor
  const cursor = document.getElementById("cursor");
  const outline = document.getElementById("cursor-outline");
  if (cursor && outline) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.16;
      outlineY += (mouseY - outlineY) * 0.16;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    const hoverTargets = document.querySelectorAll("a, button, .btn-primary, .btn-ghost, .card, .chip");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => outline.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => outline.classList.remove("cursor-hover"));
    });
  }
});
