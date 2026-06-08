import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

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
        React: 'readonly',
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
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: ['\\?raw$'],
        },
      ],
    },
  },
];

export default config;



