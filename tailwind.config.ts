/** @type {import('tailwindcss').Config} */
export default {
  // Enable class-based dark mode so we can toggle it via a class on <html>
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Custom animation for skeleton shimmer effect
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
}
