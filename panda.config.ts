import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./resources/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        purple: {
          default: {
            value: '#633CFF',
          },
          hover: {
            value: '#BEADFF',
          },
          light: {
            value: '#EFEBFF',
          },
        },
        borders: {
          value: '#D9D9D9',
        },
        grey: {
          default: {
            value: '#333333',
          },
          normal: {
            value: '#737373',
          },
          light: {
            value: '#FAFAFA',
          },
        },
        white: {
          value: '#FFFFFF',
        },
        red: {
          value: '#FF3939',
        },
      },
    },
    textStyles: {
      body: {
        s: {
          value: {
            fontSize: '0.75rem',
            fontFamily: 'Instrument Sans',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '150%',
          },
        },
        m: {
          value: {
            fontSize: '1rem',
            fontFamily: 'Instrument Sans',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '150%',
          },
        },
      },
      heading: {
        s: {
          value: {
            fontSize: '1rem',
            fontFamily: 'Instrument Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '150%',
          },
        },
        m: {
          value: {
            fontSize: { base: '1.5rem', md: '2rem' },
            fontFamily: 'Instrument Sans',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '150%',
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: './resources/js/styled-system',

  jsxFramework: 'react',
})
