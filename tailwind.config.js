const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.js", "./pages/**/*.js"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
    content: [
    './pages/**/*.{html,tsx}',
    './components/**/*.{html,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
};