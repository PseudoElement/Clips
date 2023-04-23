const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
     plugins: [
          require("tailwindcss"),
          require("autoprefixer"),
          require("@fullhuman/postcss-purgecss")({
               content: ["./src/**/*.html", "./src/**/*.ts"],
               defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
     ],
};
