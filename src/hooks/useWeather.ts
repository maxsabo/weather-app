import { useEffect, useState } from 'react';
import { WeatherData } from '../types/weather';
import { API_BASE_URL, API_KEY, CACHE_DURATION } from '../utils/constants';
import axios from 'axios';

interface CacheEntry {
  data: WeatherData;
  timestamp: number;
}

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city.trim()) {
      setWeather(null);
      setError(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `weather_${city.toLowerCase()}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp }: CacheEntry = JSON.parse(cached);
        const isCacheValid = Date.now() - timestamp < CACHE_DURATION;
        if (isCacheValid) {
          setWeather(data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get<WeatherData>(API_BASE_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        });

        const weatherData = response.data;
        setWeather(weatherData);

        const CacheEntry: CacheEntry = {
          data: weatherData,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(CacheEntry));
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError('City not found');
        } else {
          setError('Failed to fetch weather data');
        }
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};
