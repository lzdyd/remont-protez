const path = require('path');

module.exports = {
  plugins: {
    'posthtml-modules': {
      root: path.resolve(__dirname, 'src'),
      from: path.resolve(__dirname, 'src', 'views'),
    },
  },
};
