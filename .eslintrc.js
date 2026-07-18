module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'react-native/no-inline-styles': 'warn',
    'react/no-unstable-nested-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^[A-Z_]',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
