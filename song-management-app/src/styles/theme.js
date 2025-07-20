// src/styles/theme.js

const breakpoints = ['40em', '52em', '64em']; // 640px, 832px, 1024px

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1DB954',
    text: '#333',
    background: '#fff',
  },
  space: [0, 4, 8, 16, 32, 64],
  fonts: {
    body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: 'Georgia, serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48],
  breakpoints,
};

export default theme;
