import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pennyConfig from '@melio/eslint-config-penny';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import monorepoPlugin from 'eslint-plugin-monorepo';

const __dirname = dirname(fileURLToPath(import.meta.url));

const restrictedChakraImports = {
  group: ['@chakra-ui/react'],
  importNames: [
    'useStyleConfig',
    'useMultiStyleConfig',
    'ComponentSingleStyleConfig',
    'ComponentMultiStyleConfig',
    'ComponentStyleConfig',
    'Portal',
    'VisuallyHidden',
    'useBoolean',
  ],
};

const config = [
  {
    ignores: ['dist/**/*', '**/*.d.ts', '**/*.d.ts.map', '**/.cache/**/*', '**/node_modules/**/*'],
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
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [restrictedChakraImports],
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
    files: ['**/*.stories.*', '**/stories/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['components$'],
              message: 'Please use one of the Storybook templates instead.',
            },
            restrictedChakraImports,
          ],
        },
      ],
      'monorepo/no-relative-import': [
        'error',
        {
          ignore: ['storybook-utils', '@melio/*'],
        },
      ],
      'import/no-duplicates': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
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
    files: ['src/theme/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../providers', '../hooks', '../utils', '../icons', '../*/**/index'],
              message: 'Inside theme, import from concrete files to avoid barrels and cycles.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['scripts/**/*'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
      'no-restricted-syntax': 'off',
    },
  },
];

export default config;



