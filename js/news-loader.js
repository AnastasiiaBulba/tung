// Функція для завантаження даних з JSON файлу
async function loadNewsData() {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    return data.news;
  } catch (error) {
    console.error("Помилка завантаження даних новин:", error);
    return null;
  }
}

// Функція для створення HTML елемента новини
function createNewsItem(newsItem) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "news-item";

  const titleDiv = document.createElement("div");
  titleDiv.className = "news-item-title";
  titleDiv.textContent = newsItem.title;

  const shortDiv = document.createElement("div");
  shortDiv.className = "news-item-short";
  shortDiv.textContent = newsItem.short;

  const button = document.createElement("button");
  button.className = "read-more-btn";
  button.textContent = "Read more";

  const fullDiv = document.createElement("div");
  fullDiv.className = "news-item-full";
  fullDiv.style.display = "none";
  fullDiv.innerHTML = newsItem.full;

  // Додаємо зображення, якщо воно є
  if (newsItem.image) {
    const img = document.createElement("img");
    img.src = newsItem.image;
    img.alt = newsItem.title;
    img.className = "news-item-img";
    img.style.cssText =
      "display: block; margin: 1.2em auto 0 auto; max-width: 180px; border-radius: 16px; box-shadow: 0 2px 12px #0002;";
    fullDiv.appendChild(img);
  }

  itemDiv.appendChild(titleDiv);
  itemDiv.appendChild(shortDiv);
  itemDiv.appendChild(button);
  itemDiv.appendChild(fullDiv);

  return itemDiv;
}

// Функція для заповнення секції новин
function populateNewsSection(sectionId, newsData) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const newsList = section.querySelector(".news-list");
  if (!newsList) return;

  // Очищаємо існуючий контент
  newsList.innerHTML = "";

  // Додаємо нові елементи
  newsData.forEach((newsItem) => {
    const itemElement = createNewsItem(newsItem);
    newsList.appendChild(itemElement);
  });
}

// Функція для ініціалізації сторінки новин
async function initializeNewsPage() {
  const newsData = await loadNewsData();
  if (!newsData) return;

  // Заповнюємо секцію оновлень
  if (newsData.updates) {
    populateNewsSection("game-updates-section", newsData.updates);
  }

  // Заповнюємо секцію щоденників
  if (newsData.diaries) {
    populateNewsSection("assembly-diaries-section", newsData.diaries);
  }

  // Додаємо обробники подій для кнопок "Read more"
  addNewsEventListeners();
}

// Функція для додавання обробників подій
function addNewsEventListeners() {
  document.querySelectorAll(".news-section").forEach((section) => {
    section.addEventListener("click", function (e) {
      if (e.target.classList.contains("read-more-btn")) {
        const item = e.target.closest(".news-item");
        const full = item.querySelector(".news-item-full");
        if (full.style.display === "none") {
          full.style.display = "block";
          e.target.textContent = "Show less";
        } else {
          full.style.display = "none";
          e.target.textContent = "Read more";
        }
      }
    });
  });
}

// Ініціалізація при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  // Перевіряємо, чи ми на сторінці новин
  if (document.querySelector(".news-section")) {
    initializeNewsPage();
  }
});
