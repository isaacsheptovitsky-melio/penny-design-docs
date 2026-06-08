import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

// Minimal ESLint config for penny-mcp without type-aware linting.
// The @modelcontextprotocol/sdk has complex types that cause memory issues with type-aware rules.
// Type checking is handled separately by `yarn typecheck`.
const config = [
  {
    ignores: ['dist/**/*', 'node_modules/**/*', 'eslint.config.mjs', 'eslint.config.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript recommended rules (non-type-aware only)
      ...typescriptEslintPlugin.configs.recommended.rules,
      'no-undef': 'off',
      'no-redeclare': 'off',
      // Allow @ts-nocheck for files with MCP SDK type issues
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': 'allow-with-description' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      // Import rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // Prettier
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['esbuild.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];

export default config;
