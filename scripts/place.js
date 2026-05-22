const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
currentYear.textContent = today.getFullYear();

lastModified.textContent = `Last Modified: ${document.lastModified}`;

window.addEventListener('DOMContentLoaded', () => {
    const currentTemp = 10;
    const currentWindSpeed = 5;
    const windChillElement = document.getElementById('wind-chill');

    if (currentTemp <= 10 && currentWindSpeed > 4.8) {
        const result = calculateWindChill(currentTemp, currentWindSpeed);
        windChillElement.textContent = `${result.toFixed(1)} °C`;
    } else {
        
        windChillElement.textContent = "N/A";
    }
});

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
}