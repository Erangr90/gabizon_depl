import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/zvijude/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { min: '0px', max: '1000px' },
        desktop: { min: '1000px' },
      },
      // colors: {
      //   solid: '#AC6CA6',
      //   soft: '#EEE2ED',
      //   bg_main_color: '#FBF9FB',
      // },
      colors: {
        solid: 'var(--color-solid)',
        soft: 'var(--color-soft)',
        bg_main_color: 'var(--color-bg)',
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.abs-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.fix-center': {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.abs-center-y': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.min-h-inherit': {
          minHeight: 'inherit',
        },
        '.min-w-inherit': {
          minWidth: 'inherit',
        },
        '.h-inherit': {
          height: 'inherit',
        },
        '.w-inherit': {
          width: 'inherit',
        },
      })
    },
  ],
}
export default config
