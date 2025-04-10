if (typeof structuredClone === 'undefined') {
  globalThis.structuredClone = function <T>(obj: T): T {
    if (obj === undefined || obj === null) {
      return obj;
    }
    return JSON.parse(JSON.stringify(obj));
  };
}

import { createSystem, defaultConfig } from '@chakra-ui/react';
import '@testing-library/jest-dom';

const config = {
  theme: {
    tokens: {
      colors: {
        sky: {
          500: { value: '#63B3ED' },
          600: { value: '#4299E1' },
        },
        gray: {
          50: { value: '#F7FAFC' },
          700: { value: '#2D3748' },
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
};

export const system = createSystem(defaultConfig, config);
