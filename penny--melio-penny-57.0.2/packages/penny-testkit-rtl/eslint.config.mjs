import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import monorepoPlugin from 'eslint-plugin-monorepo';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
  { ignores: ['dist/**', '**/*.d.ts'] },
  ...pennyConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname },
    },
    plugins: { '@typescript-eslint': typescriptEslintPlugin, import: importPlugin, monorepo: monorepoPlugin },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json', alwaysTryTypes: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'import/no-unresolved': ['error', { ignore: ['\\?raw$', '^@/'] }],
    },
  },
  {
    files: ['**/*.ts'],
    rules: { 'monorepo/no-relative-import': ['error', { ignore: ['@melio/*', 'storybook-utils'] }] },
  },
];

export default config;
