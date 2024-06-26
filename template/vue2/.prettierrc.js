const pug = require('@prettier/plugin-pug');
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  semi: true,
  pugSingleQuote: false,
  arrowParens: 'avoid',
  ...pug.prettier
};