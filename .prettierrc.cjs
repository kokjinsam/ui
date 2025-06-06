/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "tv"],
  trailingComma: "none",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  quoteProps: "consistent"
}
