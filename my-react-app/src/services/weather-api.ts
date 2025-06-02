import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    }
  });
  return response.data;
};
