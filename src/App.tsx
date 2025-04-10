import { Box } from '@chakra-ui/react';
import { WeatherForm } from './components/WeatherForm';
import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherDisplay } from './components/WeatherDisplay';

export const App = () => {
  const [city, setCity] = useState('');
  const { weather, loading, error } = useWeather(city);

  return (
    <Box minH={'100vh'} p={{ base: 4, md: 8 }} bg="gray.50">
      <WeatherForm onCitySubmit={setCity} />
      <WeatherDisplay weather={weather} loading={loading} error={error} />
    </Box>
  );
};
