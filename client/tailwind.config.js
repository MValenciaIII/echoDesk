function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsla(var(${variableName}))`;
  };
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // blue: {
        //   DEFAULT: '#3D5467',
        //   dark: '#263440',
        // },
        // white: {
        //   DEFAULT: '#f1edee',
        // },
        base: withOpacity('--color-base'),
        'off-base': withOpacity('--color-off-base'),
        'off-base-lighter': withOpacity('--color-off-base-lighter'),
        'light-base': withOpacity('--color-light-base'),
        'text-base': withOpacity('--color-text-base'),
        'text-base-inverted': withOpacity('--color-text-base-inverted'),
        'text-base-inverted-muted': withOpacity(
          '--color-text-base-inverted-muted'
        ),
        'text-muted': withOpacity('--color-text-muted'),
        low: withOpacity('--color-low'),
        pending: withOpacity('--color-pending'),
        medium: withOpacity('--color-medium'),
        high: withOpacity('--color-high'),
        urgent: withOpacity('--color-urgent'),
        warning: withOpacity('--color-warning'),
        action: withOpacity('--color-action'),
      },
    },
  },
  gridTemplateColumns: {
    // Simple 16 column grid
    16: 'repeat(16, minmax(0, 1fr))',
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
