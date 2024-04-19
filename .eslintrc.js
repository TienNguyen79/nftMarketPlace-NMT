const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
  },
  extends: ['react-app', 'prettier'],
  globals: {
    __DEV__: true,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/core-modules': ['app'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-undef': 'off',
    'no-use-before-define': 0,
    'no-eval': 'error',
    'no-console': 'warn',
    'no-var': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'max-len': 0,
    'max-depth': ['error', 4],
    'max-lines-per-function': 0,
    'brace-style': ['error', '1tbs'],
    complexity: ['error', 15],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
        },
        block: {
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    eqeqeq: ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    'jsx-a11y/anchor-is-valid': 0,
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/require-default-props': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        'global-require': 'off',
      },
    },
    {
      files: ['src/serviceWorker.ts', 'src/libs/logger/index.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
