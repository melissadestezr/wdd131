const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-4853007-wallpaper.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-exterior-1419634-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40714,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-1585257-wallpaper.jpg"
  }
];

function createTempleCard(temple) {

  const year = parseInt(temple.dedicated.split(",")[0]);

  const figure = document.createElement("figure");

  figure.innerHTML = `
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName}"
      loading="lazy"
      width="400"
      height="250"
    >
    <figcaption>
      <h3>${temple.templeName}</h3>
      <p><span>Location:</span> ${temple.location}</p>
      <p><span>Dedicated:</span> ${temple.dedicated}</p>
      <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
    </figcaption>
  `;

  return figure;
}

function displayTemples(filter = "all") {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // limpa antes de renderizar

  const filtered = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(",")[0]);

    switch (filter) {
      case "old":   return year < 1900;
      case "new":   return year > 2000;
      case "large": return temple.area > 90000;
      case "small": return temple.area < 10000;
      default:      return true; // "all" / Home
    }
  });

  if (filtered.length === 0) {
    gallery.innerHTML = `<p class="no-results">No temples found for this filter.</p>`;
    return;
  }

  filtered.forEach(temple => {
    gallery.appendChild(createTempleCard(temple));
  });
}

const navLinks = document.querySelectorAll(".nav-link");
const galleryTitle = document.getElementById("gallery-title");
const navUl = document.querySelector("nav ul");
const hamburger = document.getElementById("hamburger");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const filter = link.dataset.filter;
    galleryTitle.textContent = link.textContent;
    displayTemples(filter);

    if (navUl.classList.contains("open")) {
      navUl.classList.remove("open");
      hamburger.innerHTML = "&#9776;";
      hamburger.setAttribute("aria-expanded", false);
    }
  });
});

if (hamburger && navUl) {
  hamburger.addEventListener("click", () => {
    const isOpen = navUl.classList.toggle("open");
    hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    hamburger.setAttribute("aria-expanded", isOpen);
  });
}

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

displayTemples("all");