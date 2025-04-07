import { App } from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        sky: {
          500: { value: '63B3ED' },
        },
        gray: {
          50: { value: 'F7FAFC' },
          700: { value: 'F7FAFC' },
        },
      },
      breakpoints: {
        sm: { value: '30em' },
        md: { value: '48em' },
        lg: { value: '62em' },
        xl: { value: '80em' },
      },
    },
  },
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      backgroundColor: 'gray.50',
      color: 'gray.700',
      fontFamily: "'Inter', sans-serif",
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
  },
});

const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
