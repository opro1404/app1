/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        card: '#141414',
        border: '#1E1E1E',
        orange: {
          DEFAULT: '#FF6B2B',
          light: '#FF8C5A',
          dark: '#D94F15',
        },
        surface: '#1A1A1A',
        muted: '#3A3A3A',
        dim: '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        flame: 'flame 1.5s ease-in-out infinite',
        'pulse-orange': 'pulse-orange 2s ease-in-out infinite',
      },
      keyframes: {
        flame: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.05)' },
        },
        'pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 107, 43, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 107, 43, 0)' },
        },
      },
    },
  },
  plugins: [],
}
