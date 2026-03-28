// --- Static weather values ---
const temperature = 28;   // °C 
const windSpeed   = 14;   // km/h 

// --- Wind Chill Calculation ---
// Valid only when temp <= 10°C AND wind speed > 4.8 km/h
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// --- Display Wind Chill on page load ---
function displayWindChill() {
    const windChillEl = document.getElementById('wind-chill-value');
 
    if (temperature <= 10 && windSpeed > 4.8) {
        const chill = calculateWindChill(temperature, windSpeed);
        windChillEl.textContent = chill.toFixed(1) + ' °C';
    } else {
        // Conditions not met = display N/A
        windChillEl.textContent = 'N/A';
    }
}

// --- Footer ---
function setFooterInfo() {
    // Current year
    const yearEl = document.getElementById('current-year');
    yearEl.textContent = new Date().getFullYear();
 
    // Last modified
    const lastModEl = document.getElementById('last-modified');
    lastModEl.textContent = document.lastModified;
}
 
// --- Run on page load ---
displayWindChill();
setFooterInfo();