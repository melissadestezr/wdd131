// Purrfect Companions – main.js
// Shared across all pages
// =============================================
 
// ── Footer Year ──────────────────────────────
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
 
// ── Mobile Nav Toggle ─────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const mainNav   = document.querySelector('.main-nav');
 
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
 
  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
 
// ── Fun Facts (index.html only) ───────────────
const funFacts = [
  "Cats spend 70% of their lives sleeping — that's around 13 to 16 hours a day on average.",
  "A cat's purr vibrates at frequencies between 25 and 150 Hz, which can promote bone density and healing.",
  "Cats have a unique 'righting reflex' that lets them twist their body mid-fall to land on their feet.",
  "The first cat in space was Félicette, a French street cat, launched on October 18, 1963.",
  "Cats can't taste sweetness — they lack the taste receptor gene that detects sugar.",
  "A group of cats is called a clowder, while a group of kittens is called a kindle.",
  "Cats have nearly 300 million neurons in their cerebral cortex, compared to about 160 million in dogs.",
  "Ancient Egyptians worshipped cats as sacred animals; harming one was punishable by death.",
  "A cat's nose print is unique — just like a human fingerprint, no two are exactly alike.",
  "Cats can make over 100 different vocal sounds, while dogs can make around 10."
];
 
const factCard   = document.getElementById('factCard');
const factText   = document.getElementById('factText');
const factNumber = document.getElementById('factNumber');
const prevBtn    = document.getElementById('prevFact');
const nextBtn    = document.getElementById('nextFact');
 
if (factText && factNumber) {
  // Retrieve saved index from localStorage, default to a random one
  let currentIndex = parseInt(localStorage.getItem('factIndex'), 10);
  if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= funFacts.length) {
    currentIndex = Math.floor(Math.random() * funFacts.length);
  }
 
  /**
   * Renders the fact at the given index with a fade transition.
   * @param {number} index
   */
  function showFact(index) {
    if (factCard) factCard.style.opacity = '0';
 
    setTimeout(() => {
      factText.textContent = `"${funFacts[index]}"`;
      factNumber.textContent = `${index + 1} / ${funFacts.length}`;
      if (factCard) factCard.style.opacity = '1';
      factCard.style.transition = 'opacity 0.4s ease';
    }, 200);
 
    localStorage.setItem('factIndex', String(index));
    currentIndex = index;
  }
 
  showFact(currentIndex);
 
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const next = (currentIndex + 1) % funFacts.length;
      showFact(next);
    });
  }
 
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const prev = (currentIndex - 1 + funFacts.length) % funFacts.length;
      showFact(prev);
    });
  }
}