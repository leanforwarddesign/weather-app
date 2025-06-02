import React, { useState } from 'react';
import './App.css';
import { fetchWeather, fetchForecast, WeatherData, ForecastData } from './services/weather-api';
import SearchBar from './components/search-bar';
import WeatherCard from './components/weather-card';
import Forecast from './components/forecast';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="App">
        <header className="app-header">
          <h1>Weather App</h1>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </header>

        <main className="app-main">
          {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
          )}

          {weather && (
              <div className="weather-section">
                <WeatherCard weather={weather} />
              </div>
          )}

          {forecast && (
              <div className="forecast-section">
                <Forecast forecast={forecast} />
              </div>
          )}

          {!weather && !loading && !error && (
              <div className="welcome-message">
                <p>Enter a city name to get current weather and forecast</p>
              </div>
          )}
        </main>
      </div>
  );
}

export default App;