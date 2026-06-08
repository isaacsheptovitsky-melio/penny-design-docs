import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: '.storybook',
      storybookScript: 'pnpm storybook --ci',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../packages/penny/src'),
    },
  },
  define: {
    // Make sure we are not using s3 themes in test mode
    __USE_S3THEMES__: JSON.stringify(''),
  },
  test: {
    name: 'storybook',
    exclude: [
      '**/storybook-utils/**/*.stories.@(js|jsx|ts|tsx)',
      'packages/**/src/**/*.mdx',
      'packages/penny-assets/**/*.stories.@(js|jsx|ts|tsx)',
      'packages/penny-testkit*/**/*.stories.@(js|jsx|ts|tsx)',
      'packages/penny-utils/**/*.stories.@(js|jsx|ts|tsx)',
      'packages/penny-mcp/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['./.storybook/vitest.setup.ts'],
    testTimeout: 30000,
    reporters: process.env['CI'] ? ['junit', 'default'] : 'default',
    outputFile: process.env['CI'] ? '.reports/storybook-a11y-tests.xml' : undefined,
  },
});
