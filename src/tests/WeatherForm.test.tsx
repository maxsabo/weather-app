import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherForm } from '../components/WeatherForm';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../setupTests';

describe('WeatherForm', () => {
  it('renders input and button', () => {
    render(
      <ChakraProvider value={system}>
        <WeatherForm onCitySubmit={() => {}} />
      </ChakraProvider>
    );
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /get weather/i })
    ).toBeInTheDocument();
  });

  it('calls onCitySubmit with trimmed city name on submit', () => {
    const mockOnCitySubmit = jest.fn();
    render(
      <ChakraProvider value={system}>
        <WeatherForm onCitySubmit={mockOnCitySubmit} />
      </ChakraProvider>
    );

    const input = screen.getByPlaceholderText('Enter city name');
    const button = screen.getByRole('button', { name: /get weather/i });

    fireEvent.change(input, { target: { value: '  Kyiv  ' } });
    fireEvent.click(button);

    expect(mockOnCitySubmit).toHaveBeenCalledWith('Kyiv');
    expect(input).toHaveValue('');
  });

  it('does not call onCitySubmit if input is empty', () => {
    const mockOnCitySubmit = jest.fn();
    render(
      <ChakraProvider value={system}>
        <WeatherForm onCitySubmit={mockOnCitySubmit} />
      </ChakraProvider>
    );

    const button = screen.getByRole('button', { name: /get weather/i });
    fireEvent.click(button);

    expect(mockOnCitySubmit).not.toHaveBeenCalled();
  });
});
