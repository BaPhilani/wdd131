document.getElementById("year").textContent =
new Date().getFullYear();

document.getElementById("lastModified").textContent =
`Last Modified: ${document.lastModified}`;

// Wind Chill Calculation
const temperature = 24;
const windSpeed = 10;

function calculateWindChill(temp, speed) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
}

const windChill =
calculateWindChill(temperature, windSpeed);

document.getElementById("windchill").textContent =
`${windChill}°C`;
