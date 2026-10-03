module.exports = {
  darkMode: 'class',
  content: ['./site/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5e40e0',
          dim: '#5130d4',
          container: '#c3b8ff',
        },
        secondary: {
          DEFAULT: '#455e93',
          container: '#d8e2ff',
        },
        tertiary: {
          DEFAULT: '#715e00',
          container: '#fdd400',
        }
      }
    }
  }
};
