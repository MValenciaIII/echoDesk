module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#3D5467',
          dark: '#263440',
        },
        white: {
          DEFAULT: '#f1edee',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
