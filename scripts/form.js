const products = [
  { id: "fc-1888", name: "automatic cat feeder",    averagerating: 4.5 },
  { id: "fc-2050", name: "self-cleaning litter box", averagerating: 4.7 },
  { id: "fs-1987", name: "cat scratching post",      averagerating: 3.5 },
  { id: "ac-2000", name: "interactive laser toy",    averagerating: 3.9 },
  { id: "jj-1969", name: "cat water fountain",       averagerating: 5.0 }
];
 
function setFooterInfo() {
  const yearEl = document.getElementById("year");
  const modEl  = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = `Last Modified: ${document.lastModified}`;
}

function populateProducts() {
  const select = document.getElementById("productName");
  if (!select) return;
 
  products.forEach(product => {
    const option = document.createElement("option");
    option.value       = product.id;  
    option.textContent = product.name; 
    select.appendChild(option);
  });
}

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key) || "";
}
 
function getAllParams(key) {
  return new URLSearchParams(window.location.search).getAll(key);
}

function lookupProductName(id) {
  const product = products.find(p => p.id === id);
  return product ? product.name : id;
}
 
function starsDisplay(rating) {
  if (!rating) return "—";
  const n = parseInt(rating, 10);
  return "★".repeat(n) + "☆".repeat(5 - n) + `  (${n}/5)`;
}
 
function handleCounter() {
  const el = document.getElementById("reviewCount");
  if (!el) return;
 
  const STORAGE_KEY = "reviewCount";
  let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  count += 1;
  localStorage.setItem(STORAGE_KEY, count);
  el.textContent = count;
}
 
function buildSummary() {
  const tbody = document.getElementById("summaryBody");
  if (!tbody) return;
 
  const rows = [
    { label: "Product",        value: lookupProductName(getParam("productName")) || "—" },
    { label: "Rating",         value: starsDisplay(getParam("rating")) },
    { label: "Install Date",   value: getParam("installDate") || "—" },
    { label: "Features",       value: getAllParams("features").join(", ") || "None selected" },
    { label: "Review",         value: getParam("writtenReview") || "No written review provided." },
    { label: "Reviewer",       value: getParam("userName") || "Anonymous" },
  ];
 
  rows.forEach(({ label, value }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="label-cell">${label}</td><td>${value}</td>`;
    tbody.appendChild(tr);
  });
}

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;
 
populateProducts();
handleCounter();
buildSummary();
setFooterInfo();
 