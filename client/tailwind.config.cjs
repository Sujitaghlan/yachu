/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        secondary: "#cbcaca",
        tertiary: "#6d6d6d",
        green: "#67FF58",
        icon: "#008000",
        google: "#679BCE",
        info: "#4169E1"
      },
      fontFamily: {
        headline: ["'Times New Roman'", "serif"],
        paragraph: ["Lato", "sans-serif"],
      },
      fontSize: {
        h1: "32px",
        h2: "18px",
        h3: "12px",
        heading: "55px",
        paragraph: "12px",
      },
      lineHeight: {
        h2: "14px",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(50px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        }
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      animation: {
  'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
  'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
  'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
  'slide-in-right': 'slideInRight 0.6s ease-out forwards',
  'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce-slow': 'bounce 2s infinite',
},
    },
  },
  plugins: [],
};