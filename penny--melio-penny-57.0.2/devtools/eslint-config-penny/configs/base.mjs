import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import monorepoPlugin from 'eslint-plugin-monorepo';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

const baseConfig = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        NodeJS: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      vitest: vitestPlugin,
      monorepo: monorepoPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...(importPlugin.configs?.recommended?.rules || {}),
      ...(importPlugin.configs?.typescript?.rules || {}),
      ...(monorepoPlugin.configs?.recommended?.rules || {}),
      'object-shorthand': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-cycle': [
        'error',
        {
          ignoreExternal: false,
          maxDepth: 3,
        },
      ],
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-internal-modules': [
        'error',
        {
          forbid: ['@melio/*/src/!(test-utils)'],
        },
      ],
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-deprecated': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/__*__/**', '**/*test.utils.*', '**/test/utils/**', '**/*.spec.*', '**/test-utils/**'],
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      'one-var': ['error', 'never'],
      'no-console': 'error',
      'no-alert': 'error',
      'arrow-body-style': 'error',
      'no-nested-ternary': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector: "NewExpression[callee.name='Date']",
          message: "new Date() is forbidden. Use createDate from 'penny-utils'",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'date-fns',
              importNames: ['isEqual'],
              message: "Please use isEqualDate from useDateUtils from 'penny-utils' instead.",
            },
          ],
          patterns: [
            {
              group: ['chromatic', 'chromatic/isChromatic'],
              message: "Import { isUsingVisualTesting } from 'test-utils' instead",
            },
          ],
        },
      ],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            consistent: true,
          },
          ObjectPattern: {
            multiline: true,
            consistent: true,
          },
          ImportDeclaration: {
            multiline: true,
            consistent: true,
          },
          ExportDeclaration: {
            multiline: true,
            consistent: true,
          },
        },
      ],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-lines': 'error',
      radix: 'error',
      ...(prettierPlugin.configs?.['recommended']?.rules || {}),
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        node: 'readonly',
      },
      ecmaVersion: 2021,
    },
  },
];

export default baseConfig;
