document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

fadeElements.forEach((el) => observer.observe(el));
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);
} else if (prefersDark) {
  document.documentElement.setAttribute("data-theme", "dark");
  updateIcon("dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  updateIcon("light");
}

themeToggle.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});
document
  .getElementById("mobile-theme-toggle")
  ?.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

function updateIcon(theme) {
  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id], header[id]");
  let current = "home"; // پیش‌فرض Home

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  if (scrollY + window.innerHeight >= document.body.offsetHeight - 50) {
    current = "contact";
  }

  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(
    `.nav-links a[href="#${current}"], .mobile-menu a[href="#${current}"]`,
  );
  if (activeLink) {
    activeLink.classList.add("active");
  }
});

window.addEventListener("load", () => {
  const homeLink = document.querySelector(
    '.nav-links a[href="#home"], .mobile-menu a[href="#home"]',
  );
  if (homeLink) {
    homeLink.classList.add("active");
  }
});

document.querySelectorAll("iframe[data-src]").forEach((iframe) => {
  iframe.addEventListener("load", () => {
    iframe.src = iframe.dataset.src;
  });
});

document.addEventListener("click", function (e) {
  const wrapper = e.target.closest(".yt-lite");
  if (!wrapper || wrapper.classList.contains("loaded")) return;

  const id = wrapper.dataset.id;
  wrapper.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${id}?autoplay=1&controls=1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
  `;

  wrapper.classList.add("loaded");
});
