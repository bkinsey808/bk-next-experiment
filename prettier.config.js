module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    // match everything not starting with starting with a letter or @ but not @/
    "^(?!@/)[A-Za-z@].*",
    // everything else (local imports)
    "^.*",
  ],
  // newline between import groups
  importOrderSeparation: true,
  // sort the imports
  importOrderSortSpecifiers: true,
};
