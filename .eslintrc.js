module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: ['**/dist/*.js', '**/dist-ssr/*.js'],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-restricted-globals': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-relative-packages': 'off',
    'prefer-destructuring': 'off',
    'vue/multi-word-component-names': 'warn',
    // Enable vue/script-setup-uses-vars rule
    'vue/script-setup-uses-vars': 'error',

    'no-restricted-exports': 'off',

    semi: ['error', 'always'],

    'arrow-body-style': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 'warn',
    'import/no-named-default': 'off',
  },
};
