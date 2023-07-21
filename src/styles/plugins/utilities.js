const plugin = require('tailwindcss/plugin');

const utilities = plugin(function ({ addUtilities }) {
  addUtilities({
    '.gemx-scrollbar-hide': {
      /* IE and Edge */
      '-ms-overflow-style': 'none',

      /* Firefox */
      scrollbarWidth: 'none',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none',
        width: 0,
      },
    },

    '.alpha-bg': {
      backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
    },

    '.gemx-scrollbar-default': {
      /* IE and Edge */
      '-ms-overflow-style': 'auto',

      /* Firefox */
      scrollbarWidth: 'auto',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'block',
      },
    },
  });
});

module.exports = utilities;
