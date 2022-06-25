// const purgecss = [
//   "@fullhuman/postcss-purgecss",
//   {
//     content: ["./components/**/*.js", "./pages/**/*.js"],
//     defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//   },
// ];

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          // "system-ui",
          // "-apple-system",
          // "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          // "Arial",
          // '"Noto Sans"',
          // "sans-serif",
          // '"Apple Color Emoji"',
          // '"Segoe UI Emoji"',
          // '"Segoe UI Symbol"'
        ] // Ensure fonts with spaces have " " surrounding it.
      },
        colors: {
          "aDark":"#07282a",
          "aLight":"#f8ebd2",
          "aPrimary": "#1b8593",
          "aSecondary": "#fdaf3a"
        }
    },
    
  }, 
  plugins: [
    // "postcss-import",
    "tailwindcss",
    '@tailwindcss/aspect-ratio',
    // "autoprefixer",
    // ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
    content: [
    './pages/**/*.{html,tsx}',
    './components/**/*.{html,tsx}',
  ],
  // corePlugins: {
  //   preflight: false,
  // },
};