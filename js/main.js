// Динамічне підключення header і footer
function loadPartial(id, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

function createMobileMenu() {
  // Додаємо бургер-іконку
  const header = document.querySelector(".site-header .container");
  if (!header) return;
  if (document.getElementById("burger-btn")) return; // вже додано
  const burger = document.createElement("button");
  burger.className = "burger";
  burger.id = "burger-btn";
  burger.setAttribute("aria-label", "Open menu");
  burger.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(burger);

  // Додаємо модальне меню
  if (!document.getElementById("mobile-menu-modal")) {
    const modal = document.createElement("div");
    modal.className = "mobile-menu-modal";
    modal.id = "mobile-menu-modal";
    modal.innerHTML = `
      <div class="mobile-menu-content">
        <button class="close-modal" id="close-mobile-menu" aria-label="Close menu">&times;</button>
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="#how-to-play">How to Play</a></li>
          <li><a href="puzzle-news.html">Game Updates</a></li>
          <li><a href="tung-contacts.html">Support</a></li>
          <li><a href="tung-disclaimer.html">Game Info</a></li>
          <li><a href="tung-privacy.html">Privacy Policy</a></li>
          <li><a href="tung-cookies.html">Cookie Policy</a></li>
        </ul>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Логіка відкриття/закриття
  const modal = document.getElementById("mobile-menu-modal");
  const closeBtn = document.getElementById("close-mobile-menu");
  burger.addEventListener("click", function () {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  });
  // Закриваємо меню при натисканні на будь-який пункт
  modal.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    });
  });
}

function enableSmoothScrollAnchors() {
  function isIndexPage() {
    const path = location.pathname.replace(/\\/g, "/");
    return (
      path === "/" ||
      path.endsWith("/index.html") ||
      path === "/index.html" ||
      path === "" ||
      location.protocol === "file:"
    );
  }
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        const target = document.querySelector(hash);
        if (isIndexPage() && target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Закриваємо мобільне меню, якщо воно є
          const modal = document.getElementById("mobile-menu-modal");
          if (modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
          }
        } else if (!target) {
          // Якщо не на index або елементу немає — перенаправляємо на головну з хешем
          e.preventDefault();
          window.location.href = "./" + hash;
        }
      }
    });
  });
}

// Головний файл ініціалізації
// Завантаження header/footer, мобільне меню, плавна прокрутка, рік у футері, cookie-banner

document.addEventListener("DOMContentLoaded", function () {
  loadPartial("header", "assembly-parts/header.html", function () {
    createMobileMenu();
    enableSmoothScrollAnchors();
  });
  loadPartial("footer", "assembly-parts/footer.html");
  // footer-year.js і cookie-banner.js самі підписані на DOMContentLoaded
});
