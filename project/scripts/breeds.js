// =============================================
// Purrfect Companions – breeds.js
// Breed catalog with filtering & favorites
// =============================================

// ── Breed Data ───────────────────────────────
const breeds = [
  {
    id: "persian",
    name: "Persian",
    img: "images/persian.jpg",
    size: "medium",
    temperament: "calm",
    origin: "Iran",
    lifespan: "12–17 years",
    description: "Known for their luxurious long coats and sweet, gentle natures. They prefer calm environments and love lounging.",
    traits: { affection: 90, energy: 25, grooming: 95, intelligence: 60 }
  },
  {
    id: "siamese",
    name: "Siamese",
    img: "images/siamese.jpg",
    size: "medium",
    temperament: "playful",
    origin: "Thailand",
    lifespan: "12–20 years",
    description: "One of the oldest and most recognizable cat breeds. Siamese cats are vocal, social, and highly curious.",
    traits: { affection: 85, energy: 85, grooming: 30, intelligence: 90 }
  },
  {
    id: "maine-coon",
    name: "Maine Coon",
    img: "images/maine-coon.jpg",
    size: "large",
    temperament: "affectionate",
    origin: "United States",
    lifespan: "12–15 years",
    description: "The gentle giant of the cat world. Maine Coons are friendly, dog-like, and enjoy playing fetch.",
    traits: { affection: 90, energy: 70, grooming: 70, intelligence: 85 }
  },
  {
    id: "domestic-shorthair",
    name: "Domestic Shorthair",
    img: "images/domestic-shorthair.jpg",
    size: "large",
    temperament: "calm",
    origin: "United Kingdom",
    lifespan: "12–20 years",
    description: "Calm and undemanding with a plush coat. They are loyal without being clingy — the perfect balanced companion.",
    traits: { affection: 65, energy: 40, grooming: 40, intelligence: 65 }
  },
  {
    id: "bengal",
    name: "Bengal",
    img: "images/bengal.jpg",
    size: "medium",
    temperament: "playful",
    origin: "United States",
    lifespan: "10–16 years",
    description: "Wild-looking but domesticated, Bengals are energetic, curious, and love water. They need lots of stimulation.",
    traits: { affection: 70, energy: 95, grooming: 25, intelligence: 90 }
  },
  {
    id: "ragdoll",
    name: "Ragdoll",
    img: "images/ragdoll.jpg",
    size: "large",
    temperament: "affectionate",
    origin: "United States",
    lifespan: "13–18 years",
    description: "Ragdolls go limp when held — hence their name. They are incredibly gentle, loving, and easy-going with children.",
    traits: { affection: 98, energy: 45, grooming: 65, intelligence: 70 }
  },
  {
    id: "scottish-fold",
    name: "Scottish Fold",
    img: "images/scottish-fold.jpg",
    size: "small",
    temperament: "calm",
    origin: "Scotland",
    lifespan: "11–14 years",
    description: "Famous for their folded ears and owl-like look. Scottish Folds are sweet, adaptable, and love human company.",
    traits: { affection: 80, energy: 50, grooming: 45, intelligence: 70 }
  },
  {
    id: "abyssinian",
    name: "Abyssinian",
    img: "images/abyssinian.jpg",
    size: "small",
    temperament: "playful",
    origin: "Ethiopia",
    lifespan: "9–15 years",
    description: "One of the oldest cat breeds, Abyssinians are slender, athletic, and endlessly curious about their surroundings.",
    traits: { affection: 75, energy: 90, grooming: 25, intelligence: 92 }
  },
  {
    id: "sphynx",
    name: "Sphynx",
    img: "images/sphynx.jpg",
    size: "medium",
    temperament: "affectionate",
    origin: "Canada",
    lifespan: "8–14 years",
    description: "Hairless and warm to the touch, Sphynx cats are extroverted, energetic, and crave constant human attention.",
    traits: { affection: 95, energy: 80, grooming: 60, intelligence: 80 }
  },
  {
    id: "norwegian-forest",
    name: "Norwegian Forest Cat",
    img: "images/norwegian-forest.jpg",
    size: "large",
    temperament: "independent",
    origin: "Norway",
    lifespan: "14–16 years",
    description: "Built for cold climates with a thick double coat. They are athletic, independent, and enjoy climbing and exploring.",
    traits: { affection: 60, energy: 65, grooming: 75, intelligence: 75 }
  },
  {
    id: "russian-blue",
    name: "Russian Blue",
    img: "images/russian-blue.jpg",
    size: "medium",
    temperament: "independent",
    origin: "Russia",
    lifespan: "15–20 years",
    description: "Reserved with strangers but deeply loyal to their family. Russian Blues are elegant, quiet, and highly intelligent.",
    traits: { affection: 70, energy: 50, grooming: 30, intelligence: 85 }
  },
  {
    id: "devon-rex",
    name: "Devon Rex",
    img: "images/devon-rex.jpg",
    size: "small",
    temperament: "playful",
    origin: "United Kingdom",
    lifespan: "9–15 years",
    description: "With their curly coats and large ears, Devon Rex cats are mischievous, affectionate, and puppy-like in behavior.",
    traits: { affection: 88, energy: 88, grooming: 20, intelligence: 85 }
  }
];

// ── State ────────────────────────────────────
let favorites = loadFavorites();
let activeSize = 'all';
let activeTemp = 'all';

// ── Load / Save Favorites ─────────────────────
function loadFavorites() {
  try {
    const stored = localStorage.getItem('catFavorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem('catFavorites', JSON.stringify(favorites));
}

// ── Toggle Favorite ────────────────────────────
function toggleFavorite(breedId) {
  const index = favorites.indexOf(breedId);
  if (index === -1) {
    favorites.push(breedId);
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites();
  renderFavorites();
  updateFavButtons();
}

// ── Render Breed Card ──────────────────────────
/**
 * Creates a breed card element.
 * @param {Object} breed
 * @returns {HTMLElement}
 */
function createBreedCard(breed) {
  const isFav = favorites.includes(breed.id);

  const card = document.createElement('article');
  card.className = 'breed-card';
  card.setAttribute('role', 'listitem');
  card.dataset.id = breed.id;

  card.innerHTML = `
    <div class="breed-card-header">
      <img src="${breed.img}" alt="${breed.name}" class="breed-img" loading="lazy">
      <button
        class="fav-btn"
        data-id="${breed.id}"
        aria-label="${isFav ? `Remove ${breed.name} from favorites` : `Add ${breed.name} to favorites`}"
        title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
      >${isFav ? '♥' : '♡'}</button>
    </div>
    <div class="breed-card-body">
      <h3>${breed.name}</h3>
      <p class="breed-origin" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0">
        <span class="tag">${breed.size}</span>
        <span class="tag">${breed.temperament}</span>
      </div>
      <p>${breed.description}</p>
      <div class="breed-traits">
        ${buildTraitBars(breed.traits)}
      </div>
    </div>
  `;

  card.querySelector('.fav-btn').addEventListener('click', () => {
    toggleFavorite(breed.id);
  });

  return card;
}

// ── Build Trait Bars ───────────────────────────
/**
 * Creates HTML for trait progress bars using template literals.
 * @param {Object} traits
 * @returns {string}
 */
function buildTraitBars(traits) {
  return Object.entries(traits).map(([key, value]) => `
    <div class="trait-row">
      <span class="trait-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
      <div class="trait-bar-bg">
        <div class="trait-bar" style="width: ${value}%" role="meter" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" aria-label="${key} level ${value} out of 100"></div>
      </div>
    </div>
  `).join('');
}

// ── Render Breeds Grid ─────────────────────────
function renderBreeds() {
  const grid = document.getElementById('breedsGrid');
  const noResults = document.getElementById('noResults');
  const resultsInfo = document.getElementById('resultsInfo');
  if (!grid) return;

  const filtered = breeds.filter(breed => {
    const sizeMatch = activeSize === 'all' || breed.size === activeSize;
    const tempMatch = activeTemp === 'all' || breed.temperament === activeTemp;
    return sizeMatch && tempMatch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    if (noResults) noResults.style.display = 'block';
    if (resultsInfo) resultsInfo.textContent = 'No breeds match your filters.';
  } else {
    if (noResults) noResults.style.display = 'none';
    filtered.forEach(breed => grid.appendChild(createBreedCard(breed)));

    const filterDesc = buildFilterDescription();
    if (resultsInfo) {
      resultsInfo.textContent = `Showing ${filtered.length} of ${breeds.length} breeds${filterDesc}`;
    }
  }
}

/**
 * Returns a human-readable description of the active filters.
 * @returns {string}
 */
function buildFilterDescription() {
  const parts = [];
  if (activeSize !== 'all') parts.push(`size: ${activeSize}`);
  if (activeTemp !== 'all') parts.push(`temperament: ${activeTemp}`);
  return parts.length > 0 ? ` — filtered by ${parts.join(', ')}` : '';
}

// ── Render Favorites ───────────────────────────
function renderFavorites() {
  const list    = document.getElementById('favoritesList');
  const count   = document.getElementById('favCount');
  const clearBtn = document.getElementById('clearFavorites');
  if (!list) return;

  count.textContent = String(favorites.length);

  if (favorites.length === 0) {
    list.innerHTML = '<p class="no-favorites">No favorites yet. Click the ♡ on any breed to save it here.</p>';
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }

  if (clearBtn) clearBtn.style.display = 'inline-block';

  list.innerHTML = favorites.map(id => {
    const breed = breeds.find(b => b.id === id);
    if (!breed) return '';
    return `
      <span class="fav-tag">
        ${breed.name}
        <button aria-label="Remove ${breed.name} from favorites" data-remove="${breed.id}">✕</button>
      </span>
    `;
  }).join('');

  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFavorite(btn.dataset.remove);
    });
  });
}

// ── Update Fav Buttons After Re-render ─────────
function updateFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = btn.dataset.id;
    const isFav = favorites.includes(id);
    btn.textContent = isFav ? '♥' : '♡';
    btn.setAttribute('aria-label', isFav ? `Remove ${id} from favorites` : `Add ${id} to favorites`);
  });
}

// ── Filter Events ──────────────────────────────
const sizeFilter = document.getElementById('sizeFilter');
const tempFilter = document.getElementById('temperamentFilter');
const clearFiltersBtn = document.getElementById('clearFilters');

if (sizeFilter) {
  sizeFilter.addEventListener('change', () => {
    activeSize = sizeFilter.value;
    renderBreeds();
  });
}

if (tempFilter) {
  tempFilter.addEventListener('change', () => {
    activeTemp = tempFilter.value;
    renderBreeds();
  });
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', () => {
    activeSize = 'all';
    activeTemp = 'all';
    if (sizeFilter) sizeFilter.value = 'all';
    if (tempFilter) tempFilter.value = 'all';
    renderBreeds();
  });
}

// ── Clear All Favorites ────────────────────────
const clearFavoritesBtn = document.getElementById('clearFavorites');
if (clearFavoritesBtn) {
  clearFavoritesBtn.addEventListener('click', () => {
    favorites = [];
    saveFavorites();
    renderFavorites();
    updateFavButtons();
  });
}

// ── Init ───────────────────────────────────────
renderBreeds();
renderFavorites();
