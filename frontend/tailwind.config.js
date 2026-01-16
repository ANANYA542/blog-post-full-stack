/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#F9F7F2',
          100: '#F5F2EA',
          200: '#E5E0D8',
          300: '#D5CEC0',
        },
        brand: {
          green: '#5D7052', // Muted Green (Primary)
          dark: '#2C332E',  // Charcoal Green (Text)
          sage: '#A3B18A',  // Secondary
          hover: '#4A5D45', // Darker Green
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Merriweather', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: []
}
