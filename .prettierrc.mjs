/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // Core formatting
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  printWidth: 80,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",

  // JSX specific
  jsxSingleQuote: false,

  // Plugin configuration
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],

  // Plugin settings
  tailwindStylesheet: "./src/app/globals.css",

  // File overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
    {
      files: "*.{css,scss,less}",
      options: {
        singleQuote: true,
      },
    },
  ],
};

export default config;
