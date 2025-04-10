import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
// import { AxiosError, AxiosHeaders } from 'axios';
import { useWeather } from '../hooks/useWeather';
import { WeatherData } from '../types/weather';

jest.mock('axios');

describe('useWeather', () => {
  const mockWeather: WeatherData = {
    name: 'Kyiv',
    main: { temp: 15.5 },
    weather: [{ description: 'clear sky', icon: '01d' }],
    dt: 1726660758,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // process.env.VITE_API_KEY = 'mock-api-key';
  });

  it('fetches weather data successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockWeather });

    const { result } = renderHook(() => useWeather('Kyiv'));

    expect(result.current.loading).toBe(true);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.error).toBe(null);
  });

  // it('handles error when city not found', async () => {
  //   (axios.get as jest.Mock).mockImplementation(() => {
  //     return Promise.reject(
  //       new AxiosError(
  //         'Request failed with status code 404',
  //         '404',
  //         { headers: new AxiosHeaders(), method: 'get', url: '/weather' },
  //         null,
  //         {
  //           status: 404,
  //           data: { message: 'city not found' },
  //           statusText: 'Not Found',
  //           headers: new AxiosHeaders(),
  //           config: { headers: new AxiosHeaders(), method: 'get', url: '/weather' },
  //         }
  //       )
  //     );
  //   });

  //   const { result } = renderHook(() => useWeather('InvalidCity'));

  //   expect(result.current.loading).toBe(true);
  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   expect(result.current.loading).toBe(false);
  //   expect(result.current.weather).toBe(null);
  //   expect(result.current.error).toBe('City not found');
  // });

  it('uses cached data if available and valid', async () => {
    const cacheKey = 'weather_kyiv';
    const cachedData = {
      data: mockWeather,
      timestamp: Date.now() - 2 * 60 * 1000,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cachedData));

    const { result } = renderHook(() => useWeather('Kyiv'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(axios.get).not.toHaveBeenCalled();
    expect(result.current.weather).toEqual(mockWeather);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
