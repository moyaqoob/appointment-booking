/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  // Ensure paths are correct
  theme: {
    extend: {
      backgroundImage:{
        'gradient-primary' : 'linear-gradient(to bottom,var(--color-primary-1500),var(--color-primary-1300))',
      },
      colors: {
        primary: {
          light: "#0E2E2E",
          dark: "#061212",
        },
        secondary: '#0E2E2E',
        accent: {
          bright: "#44E5E7",
          default: "#0E2E2E",
          white: "#ECFCFD",
          aqua: "#C7F7F8",
        },
      },
    },
  },
  
  plugins: [],
};
