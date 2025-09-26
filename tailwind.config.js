/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        custom: {
          50: 'var(--custom-color-50)',
          100: 'var(--custom-color-100)',
          500: 'var(--custom-color-500)',
          600: 'var(--custom-color-600)',
          700: 'var(--custom-color-700)',
          DEFAULT: 'var(--custom-color)',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
