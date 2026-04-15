/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        solar: {
          yellow: '#F59E0B',
          orange: '#EA580C',
          gold:   '#D97706',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity:'0', transform:'translateY(30px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        fadeIn:    { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
        slideLeft: { '0%': { opacity:'0', transform:'translateX(-30px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
        pulseGlow: { '0%,100%': { boxShadow:'0 0 20px rgba(34,197,94,0.3)' }, '50%': { boxShadow:'0 0 40px rgba(34,197,94,0.7)' } },
        float:     { '0%,100%': { transform:'translateY(0px)' }, '50%': { transform:'translateY(-10px)' } },
      }
    },
  },
  plugins: [],
};
