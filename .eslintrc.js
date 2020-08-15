'use strict';

module.exports = {
  extends: 'ash-nazg/sauron-node',
  parserOptions: {
    sourceType: 'module'
  },
  settings: {
    polyfills: [
      'Array.isArray',
      'document.head',
      'document.querySelectorAll',
      'Promise',
      'window.getComputedStyle'
    ],
    coverage: true
  },
  env: {
    node: false,
    browser: true
  },
  overrides: [
    {
      files: '.eslintrc.js',
      extends: ['plugin:node/recommended-script'],
      rules: {
        'import/no-commonjs': 0
      }
    },
    {
      files: 'test/**',
      extends: ['plugin:node/recommended-script'],
      rules: {
        'node/exports-style': 'off'
      },
      env: {
        node: true,
        mocha: true
      }
    },
    {
      files: ['**/*.md'],
      settings: {
        polyfills: [
          'document.body'
        ]
      },
      rules: {
        'eol-last': ['off'],
        'no-console': ['off'],
        'no-undef': ['off'],
        'padded-blocks': ['off'],
        'import/unambiguous': ['off'],
        'import/no-unresolved': ['off'],
        'node/no-missing-import': ['off'],
        'no-multi-spaces': 'off',
        'no-unused-vars': ['error', {
          varsIgnorePattern: '^(loadStylesheets|stylesheetElements|widget)$'
        }],
        // Disable until may fix https://github.com/gajus/eslint-plugin-jsdoc/issues/211
        indent: 'off'
      }
    }
  ],
  rules: {
    // Todo: Reenable
    'jsdoc/require-jsdoc': 0
  }
};
