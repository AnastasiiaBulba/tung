// Логіка банера cookies
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  if (!banner) {
    console.warn("Cookie banner element not found");
    return;
  }

  // Перевіряємо, чи користувач вже прийняв cookies
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    // Показуємо банер з невеликою затримкою для кращого UX
    setTimeout(() => {
      banner.style.display = "flex";
      banner.style.opacity = "0";
      banner.style.transform = "translateY(80px) scale(0.95)";

      // Плавно з'являємо банер
      requestAnimationFrame(() => {
        banner.style.transition =
          "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        banner.style.opacity = "1";
        banner.style.transform = "translateY(0) scale(1)";
      });
    }, 1000); // Затримка 1 секунда
  }

  // Обробник для кнопки "Accept"
  const acceptBtn = banner.querySelector(".cookie-banner__accept");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      // Зберігаємо згоду
      localStorage.setItem("cookieConsent", "accepted");

      // Плавно приховуємо банер
      banner.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      banner.style.opacity = "0";
      banner.style.transform = "translateY(80px) scale(0.95)";

      // Повністю приховуємо після анімації
      setTimeout(() => {
        banner.style.display = "none";
      }, 400);
    });
  }

  // Додатковий обробник для посилання на політику cookies
  const policyLink = banner.querySelector(".cookie-banner__link");
  if (policyLink) {
    policyLink.addEventListener("click", function (e) {
      // Відкриваємо в новій вкладці
      e.preventDefault();
      window.open(this.href, "_blank", "noopener,noreferrer");
    });
  }

  // Обробник для закриття по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && banner.style.display === "flex") {
      acceptBtn.click();
    }
  });
});

// Функція для тестування банера (викликати через консоль)
window.testCookieBanner = function () {
  localStorage.removeItem("cookieConsent");
  location.reload();
};

// Функція для примусового показу банера
window.showCookieBanner = function () {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    localStorage.removeItem("cookieConsent");
    banner.style.display = "flex";
    banner.style.opacity = "0";
    banner.style.transform = "translateY(80px) scale(0.95)";

    requestAnimationFrame(() => {
      banner.style.transition =
        "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      banner.style.opacity = "1";
      banner.style.transform = "translateY(0) scale(1)";
    });
  }
};

// Виводимо інструкції в консоль
console.log("🍪 Cookie Banner Test Commands:");
console.log("testCookieBanner() - очистити localStorage і перезавантажити");
console.log("showCookieBanner() - примусово показати банер");
console.log("localStorage.removeItem('cookieConsent') - очистити згоду");
