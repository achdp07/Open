/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-deep': 'var(--color-navy-deep)',
        'teal-dark': 'var(--color-teal-dark)',
        'lime-bright': 'var(--color-lime-bright)',
        'yellow-neon': 'var(--color-yellow-neon)',
        'sand-light': 'var(--color-sand-light)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}