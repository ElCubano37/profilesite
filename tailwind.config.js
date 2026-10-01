/** @type {import('tailwindcss').Config} */

// Farben kommen aus CSS-Variablen, gesetzt durch das gewählte Farbschema (src/data/themes.ts)
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`
const shades = (name) => ({ DEFAULT: v(name), dark: v(`${name}-dark`), light: v(`${name}-light`) })

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Keine abgerundeten Elemente: alle Radien auf 0
    borderRadius: { none: '0', DEFAULT: '0' },
    extend: {
      fontFamily: {
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: v('ink'),
        paper: v('paper'),
        cream: v('cream'),
        skin: v('skin'),
        primary: shades('primary'),
        secondary: shades('secondary'),
        tertiary: shades('tertiary'),
        highlight: shades('highlight'),
        'on-primary': v('on-primary'),
        'on-secondary': v('on-secondary'),
        'on-tertiary': v('on-tertiary'),
        'on-highlight': v('on-highlight'),
      },
      boxShadow: {
        hard: '6px 6px 0 0 rgb(var(--ink))',
        'hard-sm': '3px 3px 0 0 rgb(var(--ink))',
        'hard-lg': '10px 10px 0 0 rgb(var(--ink))',
        'hard-hl': '4px 4px 0 0 rgb(var(--highlight))',
        'hard-hl-lg': '8px 8px 0 0 rgb(var(--highlight))',
      },
    },
  },
  plugins: [],
}
