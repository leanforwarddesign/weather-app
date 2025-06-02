
import React from 'react';
import { ForecastData } from '../services/weather-api';

interface ForecastProps {
    forecast: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    // Get daily forecasts (one per day)
    const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="forecast">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-list">
                {dailyForecasts.map((item, index) => (
                    <div key={index} className="forecast-item">
                        <div className="forecast-date">
                            {index === 0 ? 'Today' : formatDate(item.dt_txt)}
                        </div>
                        <div className="forecast-icon">
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                            />
                        </div>
                        <div className="forecast-temp">
                            <span className="temp-high">{Math.round(item.main.temp_max)}°</span>
                            <span className="temp-low">{Math.round(item.main.temp_min)}°</span>
                        </div>
                        <div className="forecast-desc">
                            {item.weather[0].description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;