const form = document.getElementById('weather-form');
const weatherData = document.getElementById('weather-data');


const API_KEY = '0a66a4498a3aed62ef7617123a4117d6';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherData.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

function displayWeather(data) {
    weatherData.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
