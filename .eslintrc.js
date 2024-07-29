module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "prefer-arrow", "unicorn"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',

    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    
    "unicorn/filename-case": [
      "warn",
      {
          cases: {
              camelCase: true,
              pascalCase: true,
          },
      },
  ],






  },
};
