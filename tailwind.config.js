export default {
  darkMode: 'class',
  content: ['./index.html', './App.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#000000',
        surface: '#111111',
        primary: '#2997ff',
        text: '#f5f5f7',
        'text-secondary': '#86868b',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
    },
  },
};
