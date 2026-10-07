import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2A4A',
          'navy-dark': '#06192E',
          'navy-light': '#163D66',
          teal: '#14B8A6',
          'teal-dark': '#0D9488',
          'teal-light': '#CCFBF1',
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          border: '#E5E7EB',
          subtle: '#F3F4F6',
          text: '#1E293B',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(11, 42, 74, 0.05), 0 1px 2px -1px rgba(11, 42, 74, 0.03)',
        card: '0 4px 12px 0 rgba(11, 42, 74, 0.04), 0 1px 2px 0 rgba(11, 42, 74, 0.02)',
        float: '0 12px 28px -4px rgba(11, 42, 74, 0.12), 0 4px 10px -2px rgba(11, 42, 74, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
