import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import monorepoPlugin from 'eslint-plugin-monorepo';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
  ...pennyConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      monorepo: monorepoPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    ignores: ['dist/**/*', '*.d.ts'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\?raw$', '^@/'],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'monorepo/no-relative-import': [
        'error',
        {
          ignore: ['@melio/*', 'storybook-utils'],
        },
      ],
    },
  },
  {
    files: ['**/cypress.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      'prettier/prettier': 'off',
    },
  },
  {
    files: ['**/cy*.ts', '**/cypress/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
];

export default config;



