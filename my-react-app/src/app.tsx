import { useState } from "react";
import './App.css';
import { fetchWeather } from "./services/weather-api";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError(null);
    } catch (err) {
      alert('Error fetching weather data');
    }
  };

  return (
      <div className="App">
        <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={"Enter city name"}
        />
        <button onClick={handleSearch}>Search</button>

        {weather && (
            <div className="mt-4 p-4 border rounded">
              <h2 className="text-xl font-bold">{weather.name}</h2>
              <p>{weather.weather[0].description}</p>
              <p>{weather.main.temp} °C</p>
            </div>
        )}
      </div>
  );
}

export default App;