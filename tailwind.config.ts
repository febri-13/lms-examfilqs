/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors untuk ExamFILQ'S
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Primary accent
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        bg: {
          DEFAULT: '#0a0f1e',
          surface: '#111827',
          'surface-2': '#1a2336',
        },
        text: {
          primary: '#e8eaf6',
          secondary: '#94a3b8',
          tertiary: '#64748b',
        },
        success: {
          DEFAULT: '#10b981',
          light: '#34d399',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#fca5a5',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        display: ['Fraunces', 'serif'], // Untuk judul
      },
      animation: {
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'timer-warning': 'timer-warning 1s ease-in-out infinite',
        'toast-in': 'toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1) translate(0,0)' },
          '50%': { transform: 'scale(1.1) translate(20px,-20px)' },
        },
        'timer-warning': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config