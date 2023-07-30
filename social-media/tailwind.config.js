/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        '1/4':'25%',
        '1/2':'50%',
        '3/4':'75%',
        '1/3':'35%'
      },
      minWidth:{
        '1/4':'25%',
        '1/2':'50%',
        '3/4':'75%',
        '1/3':'35%'
      },
      colors:{
        'navbarOrange':'#ffe8d6',
        'body-color':'#0000'
      }
    },
  },
  plugins: [],
}

    // "./src/node_modules/@material-tailwind/react/src/components/**/*.{js,ts,jsx,tsx}",
    // "./src/node_modules/@material-tailwind/react/src/theme/components/**/*.{js,ts,jsx,tsx}",