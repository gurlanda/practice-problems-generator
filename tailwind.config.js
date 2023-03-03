/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '3xs': '325px',
      // => @media (min-width: 325px) { ... }

      '2xs': '375px',
      // => @media (min-width: 375px) { ... }

      xs: '450px',
      // => @media (min-width: 450px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      ms: '720px',
      // => @media (min-width: 720px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      ml: '896px',
      // => @media (min-width: 896px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      height: (theme) => ({
        'screen-1/2': '50vh',
        'screen-1/3': 'calc(100vh / 3)',
        'screen-2/3': '67vh',
        'screen-1/4': 'calc(100vh / 4)',
        'screen-3/4': '75vh',
        'screen-1/5': '20vh',
        'screen-2/5': '40vh',
        'screen-3/5': '60vh',
        'screen-4/5': '80vh',
        'screen-1/6': 'calc(100vh / 6)',
        'screen-5/6': 'calc((100vh / 6) * 5)',
      }),
      width: (theme) => ({
        'screen-1/2': '50vw',
        'screen-1/3': 'calc(100vw / 3)',
        'screen-2/3': '67vw',
        'screen-1/4': 'calc(100vw / 4)',
        'screen-3/4': '75vw',
        'screen-1/5': '20vw',
        'screen-2/5': '40vw',
        'screen-3/5': '60vw',
        'screen-4/5': '80vw',
        'screen-1/6': 'calc(100vw / 6)',
        'screen-5/6': 'calc((100vw / 6) * 5)',
        'screen-1/8': 'calc((100vw / 8) * 1)',
        'screen-3/8': 'calc((100vw / 8) * 3)',
        'screen-5/8': 'calc((100vw / 8) * 5)',
        'screen-7/8': 'calc((100vw / 8) * 7)',
      }),
    },
  },
  plugins: [],
};
