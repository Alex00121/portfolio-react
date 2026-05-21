/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: {
          bg: '#1e1e2e',
          surface: '#2a2a3e',
          elevated: '#313145',
          border: '#3d3d5c',
          text: '#cdd6f4',
          muted: '#6c7086',
          accent: '#cba6f7',
        },
        editor: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          border: '#e2e8f0',
          text: '#1e293b',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1e293b',
            a: { color: '#6366f1' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
