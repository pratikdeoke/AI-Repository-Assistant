/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0c0f',
          surface: '#0f1318',
          border: '#1a2030',
          green: '#00ff88',
          'green-dim': '#00cc6a',
          'green-glow': 'rgba(0,255,136,0.15)',
          amber: '#ffb347',
          red: '#ff4757',
          muted: '#3a4a5c',
          text: '#c8d8e8',
          'text-dim': '#6b7f94',
        }
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGreen: {
          '0%,100%': { boxShadow: '0 0 5px rgba(0,255,136,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,136,0.6)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}
