import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

const typescriptConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'eslint.config.mjs',
      'eslint.config.js',
      '**/eslint.config.mjs',
      '**/eslint.config.js',
      '**/*.config.js',
      'vite.config.ts',
    ],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
    },
    rules: {
      ...(typescriptEslintPlugin.configs?.['recommended']?.rules || {}),
      ...(typescriptEslintPlugin.configs?.['recommended-requiring-type-checking']?.rules || {}),
      ...(importPlugin.configs?.typescript?.rules || {}),
      'no-undef': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/promise-function-async': 'error',
    },
  },
];

export default typescriptConfig;
