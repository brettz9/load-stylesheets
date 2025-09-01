import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      '.mocha-puppeteer',
      'dist'
    ]
  },
  ...ashNazg(['sauron', 'browser']),
  {
    settings: {
      polyfills: [
        'Promise',
        'Promise.all'
      ],
      coverage: true
    }
  },
  {
    files: ['**/*.md/*.js'],
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
      'sonarjs/no-internal-api-use': 'off',
      // Disable until may fix https://github.com/gajus/eslint-plugin-jsdoc/issues/211
      indent: 'off'
    }
  },
  {
    rules: {
      // Todo: Reenable
      'jsdoc/require-jsdoc': 0
    }
  }
];
