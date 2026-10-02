module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  overrides: [{ files: ['**/*.test.{js,jsx}', 'src/test-setup.js'], env: { node: true }, globals: { describe: 'readonly', it: 'readonly', expect: 'readonly', afterEach: 'readonly' } }],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'docs', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
