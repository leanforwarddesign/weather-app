import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please check your .env file.');
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      }
      throw new Error(`Weather service error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please check your .env file.');
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      }
      throw new Error(`Forecast service error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to fetch forecast data');
  }
};