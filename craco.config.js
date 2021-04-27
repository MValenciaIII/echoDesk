module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
    theme: {
      fontFamily: {
        logo: ['Exo, sans-serif'],
      },
    },
  },
};
