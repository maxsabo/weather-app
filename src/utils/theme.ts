export const config = {
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
