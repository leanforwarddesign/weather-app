import React from 'react';
import { WeatherData } from '../services/weather-api';

interface WeatherCardProps {
    weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2 className="city-name">
                    {weather.name}, {weather.sys.country}
                </h2>
                <div className="weather-icon">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                </div>
            </div>

            <div className="temperature">
                <span className="temp-main">{Math.round(weather.main.temp)}°C</span>
                <span className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}°C
        </span>
            </div>

            <div className="weather-description">
                {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <span className="label">Max/Min:</span>
                    <span className="value">
                    {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
          </span>

                </div>
                <div className="detail-item">
                    <span className="label">Sunrise:</span>
                    <span className="value">{formatTime(weather.sys.sunrise)}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Sunset:</span>
                    <span className="value">{formatTime(weather.sys.sunset)}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Humidity:</span>
                    <span className="value">{weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                    <span className="label">Wind:</span>
                    <span className="value">{weather.wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                    <span className="label">Pressure:</span>
                    <span className="value">{weather.main.pressure} hPa</span>
                </div>
                
            </div>
        </div>
    );
};

export default WeatherCard;