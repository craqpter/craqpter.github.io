// assets/js/script.js
document.addEventListener("DOMContentLoaded", () => {
    // Get the elements to update
    const todayTemperature = document.getElementById("today-temperature");
    const tomorrowTemperature = document.getElementById("tomorrow-temperature");
    const dayAfterTomorrowTemperature = document.getElementById("day-after-tomorrow-temperature");

    // Your OpenWeatherMap API key
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";

    // Function to fetch weather data
    async function fetchWeatherData() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chisinau,md&appid=${apiKey}&units=metric`);
            const data = await response.json();

            // Update today's temperature
            todayTemperature.textContent = `${data.main.temp.toFixed(1)}°C`;

            // Fetch forecast data
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Chisinau,md&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();

            // Update tomorrow's and the day after tomorrow's temperatures
            if (forecastData.list.length >= 3) {
                tomorrowTemperature.textContent = `${forecastData.list[8].main.temp.toFixed(1)}°C`;
                dayAfterTomorrowTemperature.textContent = `${forecastData.list[16].main.temp.toFixed(1)}°C`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Fetch weather data when the page loads
    fetchWeatherData();

    // Update weather data every 30 minutes (you can adjust the interval as needed)
    setInterval(fetchWeatherData, 30 * 60 * 1000); // 30 minutes in milliseconds
});
