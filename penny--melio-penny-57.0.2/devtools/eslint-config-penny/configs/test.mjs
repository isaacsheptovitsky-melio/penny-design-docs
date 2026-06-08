import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

const testConfig = [
  {
    files: [
      '**/*.spec.js',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.spec.util.tsx',
      '**/*.test.utils.tsx',
      '**/*.driver.tsx',
      '**/*.validation.tsx',
      '**/__mocks__/*.js',
      '**/__fixtures__/*.tsx',
      '**/__fixtures__/*.ts',
      '**/test-utils/*.tsx',
      'stories.utils.ts',
      'vitest.setup.ts',
      'vitest.config.ts',
      'vitest.global-setup.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
    },
  },
];

export default testConfig;
