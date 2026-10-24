/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Named colours. Their values come from the theme (src/context/theme.tsx),
      // so bg-page is black in dark mode and off-white in light mode.
      colors: {
        page: 'rgb(var(--color-page) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        track: 'rgb(var(--color-track) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        'on-ink': 'rgb(var(--color-on-ink) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};