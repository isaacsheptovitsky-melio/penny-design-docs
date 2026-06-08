import base from './configs/base.mjs';
import typescript from './configs/typescript.mjs';
import react from './configs/react.mjs';
import test from './configs/test.mjs';
import stories from './configs/stories.mjs';

const config = [
  {
    ignores: [
      '**/dist/**',
      '**/eslint.config.mjs',
      '**/eslint.config.js',
      '**/vite.config.ts',
      'configs/**/*.{js,mjs}',
      '**/configs/**/*.{js,mjs}',
      '**/*.generated.ts',
      '**/*.generated.types.ts',
    ],
  },
  ...base,
  ...typescript,
  ...react,
  ...test,
  ...stories,
  {
    files: ['**/vite.*'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['**/test-runner.ts'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['.storybook/**/*'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['packages/penny/scripts/**/*'],
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
