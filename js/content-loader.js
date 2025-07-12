// Універсальний завантажувач контенту з JSON
async function loadContentData() {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка завантаження даних:", error);
    return null;
  }
}

// Функція для оновлення hero секції
function updateHeroSection(data) {
  if (!data.hero) return;

  const heroTitle = document.querySelector(".hero-title");
  const heroSlogan = document.querySelector(".hero-slogan");

  if (heroTitle) heroTitle.textContent = data.hero.title;
  if (heroSlogan) heroSlogan.textContent = data.hero.subtitle;
}

// Функція для оновлення features секції
function updateFeaturesSection(data) {
  if (!data.features || !Array.isArray(data.features)) return;

  const featureTexts = document.querySelectorAll(".feature-text");

  featureTexts.forEach((element, index) => {
    if (data.features[index]) {
      element.textContent = data.features[index];
    }
  });
}

// Функція для оновлення how-to-play секції
function updateHowToPlaySection(data) {
  if (!data.howToPlay) return;

  // Оновлюємо controls
  if (data.howToPlay.controls && Array.isArray(data.howToPlay.controls)) {
    const controlItems = document.querySelectorAll(".how-controls .how-item");
    controlItems.forEach((element, index) => {
      if (data.howToPlay.controls[index]) {
        element.textContent = data.howToPlay.controls[index];
      }
    });
  }

  // Оновлюємо tips
  if (data.howToPlay.tips && Array.isArray(data.howToPlay.tips)) {
    const tipItems = document.querySelectorAll(".how-tips .how-item");
    tipItems.forEach((element, index) => {
      if (data.howToPlay.tips[index]) {
        element.textContent = data.howToPlay.tips[index];
      }
    });
  }
}

// Функція для оновлення mechanical assembly секції
function updateMechanicalAssemblySection(data) {
  if (!data.mechanicalAssembly) return;

  const sectionTitle = document.querySelector(
    ".mechanical-assembly .section-title"
  );
  const sectionDesc = document.querySelector(".mechanical-assembly .how-desc");

  if (sectionTitle) sectionTitle.textContent = data.mechanicalAssembly.title;
  if (sectionDesc)
    sectionDesc.textContent = data.mechanicalAssembly.description;
}

// Функція для оновлення reviews секції
function updateReviewsSection(data) {
  if (!data.reviews || !Array.isArray(data.reviews)) return;

  const reviews = document.querySelectorAll(".review");

  reviews.forEach((reviewElement, index) => {
    if (data.reviews[index]) {
      const reviewText = reviewElement.querySelector(".review-text");
      const reviewUser = reviewElement.querySelector(".review-user");

      if (reviewText) reviewText.textContent = `"${data.reviews[index].text}"`;
      if (reviewUser) reviewUser.textContent = data.reviews[index].user;
    }
  });
}

// Функція для оновлення features image
function updateFeaturesImage(data) {
  const featuresImage = document.querySelector(".features-img");
  if (featuresImage && data.featuresImage) {
    featuresImage.src = data.featuresImage;
    featuresImage.alt = "Game features showcase";
  }
}

// Головна функція ініціалізації контенту
async function initializeContent() {
  const data = await loadContentData();
  if (!data) return;

  // Оновлюємо всі секції
  updateHeroSection(data);
  updateFeaturesSection(data);
  updateHowToPlaySection(data);
  updateMechanicalAssemblySection(data);
  updateReviewsSection(data);
  updateFeaturesImage(data);
}

// Ініціалізація при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  // Перевіряємо, чи ми на головній сторінці
  if (document.querySelector(".hero") || document.querySelector(".features")) {
    initializeContent();
  }
});
