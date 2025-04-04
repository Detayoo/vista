/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
          'body': ['var(--font-body)', 'sans-serif'],
        },
        colors: {
          primary: {
            DEFAULT: '#3b82f6',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#f3f4f6',
            foreground: '#1f2937',
          },
          destructive: {
            DEFAULT: '#ef4444',
            foreground: '#ffffff',
          },
          muted: {
            DEFAULT: '#f3f4f6',
            foreground: '#6b7280',
          },
          accent: {
            DEFAULT: '#f3f4f6',
            foreground: '#1f2937',
          },
          card: {
            DEFAULT: '#ffffff',
            foreground: '#1f2937',
          },
          background: '#ffffff',
          foreground: '#1f2937',
          border: '#e5e7eb',
          input: '#e5e7eb',
          ring: '#3b82f6',
        },
        borderRadius: {
          lg: '0.5rem',
          md: '0.375rem',
          sm: '0.25rem',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
    plugins: [],
    safelist: [
      'border-border'
    ],
  }
  