import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
  {
    ignores: ['eslint.config.mjs', 'eslint.config.js'],
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
      'no-restricted-imports': 'off',
    },
  },
];

export default config;



