import { render, screen } from '@testing-library/react';
import { WeatherDisplay } from '../components/WeatherDisplay';
import { WeatherData } from '../types/weather';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../setupTests';

describe('WeatherDisplay', () => {
  it('shows spinner when loading', () => {
    render(
      <ChakraProvider value={system}>
        <WeatherDisplay weather={null} loading={true} error={null} />
      </ChakraProvider>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    render(
      <ChakraProvider value={system}>
        <WeatherDisplay weather={null} loading={false} error="City not found" />
      </ChakraProvider>
    );
    expect(screen.getByText('City not found')).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    const mockWeather: WeatherData = {
      name: 'Kyiv',
      main: { temp: 15.5 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      dt: 1726660758,
    };
    render(
      <ChakraProvider value={system}>
        <WeatherDisplay weather={mockWeather} loading={false} error={null} />
      </ChakraProvider>
    );

    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('15.5°C')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
    expect(screen.getByAltText('Weather icon')).toBeInTheDocument();
  });

  it('renders nothing when no weather data', () => {
    render(
      <ChakraProvider value={system}>
        <WeatherDisplay weather={null} loading={false} error={null} />
      </ChakraProvider>
    );
    expect(screen.queryByText(/°C/i)).not.toBeInTheDocument();
  });
});
