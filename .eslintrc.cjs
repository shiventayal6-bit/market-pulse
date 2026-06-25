module.exports = {
  root: true,
  env: { browser: true, es2023: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Must be last: disables ESLint rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // React 17+ JSX transform — no need to import React in every file
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // We use TypeScript for prop types
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
  },
}
