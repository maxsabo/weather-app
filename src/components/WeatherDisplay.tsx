import { Box, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const WeatherDisplay = ({
  weather,
  loading,
  error,
}: WeatherDisplayProps) => {
  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="lg" color="sky.500" data-testid="spinner" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!weather) {
    return null;
  }

  const { name, main, weather: weatherInfo, dt } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@4x.png`;
  const lastUpdated = new Date(dt * 1000).toLocaleTimeString();

  return (
    <Box
      mt={6}
      p={6}
      maxW="500px"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Text fontSize="5xl" fontWeight="bold">
        {name}
      </Text>
      <HStack
        gap={4}
        justify="space-between"
        align="center"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Image src={iconUrl} alt="Weather icon" boxSize="150px" />
        <Text fontSize="4xl" fontWeight="medium">
          {main.temp}°C
        </Text>
      </HStack>
      <VStack
        justify="space-between"
        gap={1}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Text fontSize="lg" textTransform="capitalize" color="gray.700">
          {weatherInfo[0].description}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Last updated: {lastUpdated}
        </Text>
      </VStack>
    </Box>
  );
};
