import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import monorepoPlugin from 'eslint-plugin-monorepo';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
  {
    ignores: ['dist/**/*', '*.d.ts', '**/generated.ts'],
  },
  ...pennyConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
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
    rules: {},
  },
  {
    files: ['**/*.generated.ts', '**/*.generated.types.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'simple-import-sort/imports': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['**/*.stories.*', '**/stories/**/*.tsx'],
    rules: {
      'monorepo/no-relative-import': [
        'error',
        {
          ignore: ['storybook-utils', '@melio/*'],
        },
      ],
      'import/no-duplicates': 'off',
    },
  },
];

export default config;



