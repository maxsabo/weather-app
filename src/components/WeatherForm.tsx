import { Box, Button, Fieldset, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface WeatherFormProps {
  onCitySubmit: (city: string) => void;
}

export const WeatherForm = ({ onCitySubmit }: WeatherFormProps) => {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onCitySubmit(cityInput.trim());
      setCityInput('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="400px" mx="auto">
      <Fieldset.Root size="md" display="flex" gap={2}>
        <Input
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name"
          bg="white"
          borderColor="gray.300"
          _hover={{ borderColor: 'sky.500' }}
          _focus={{ borderColor: 'sky.500', boxShadow: '0 0 0 1px #63B3ED' }}
        />
        <Button
          type="submit"
          bg="sky.500"
          _hover={{ bg: 'sky.600' }}
          disabled={!cityInput.trim()}
        >
          Get weather
        </Button>
      </Fieldset.Root>
    </Box>
  );
};
