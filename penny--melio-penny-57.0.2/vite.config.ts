import react from '@vitejs/plugin-react';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// eslint-disable-next-line import/no-unresolved
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';

const repoRoot = __dirname;

const isPennyPackageDir = () => {
  try {
    const packageJsonPath = path.resolve(__dirname, 'package.json');
    const fs = require('fs');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.name === '@melio/penny';
    }
  } catch {
    // If we can't read package.json, assume we're not in penny package
  }
  return false;
};

const pennyPackageRoot = isPennyPackageDir() ? __dirname : path.resolve(repoRoot, 'packages', 'penny');

const reporters = process.env['CI'] ? ['junit', 'default'] : 'default';
const outputFile = process.env['CI']
  ? path.resolve(__dirname, `.reports`, process.env['npm_package_name'] as string, `vitest.xml`)
  : undefined;

/**
 * Exposing this under ".reports/coverage" made it so we needed to find a way to tell the "test_result" in circleci to filter the coverage XMLs,
 * as they aren't junit format (and filtering in circleci is not trivial, it seems).
 * Putting it in ".coverage" is a quick win that I believe is intuitive enough.
 */
const coverageDirectory = process.env['CI']
  ? path.resolve(__dirname, `.coverage`, process.env['npm_package_name'] as string)
  : undefined;

export default defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    peerDepsExternal(),
    react(),
    // Add bundle analyzer when ANALYZE_BUNDLE is set
    ...(process.env['ANALYZE_BUNDLE']
      ? [
          visualizer({
            filename: path.resolve(pennyPackageRoot, 'dist/stats.html'),
            open: true,
            gzipSize: true,
            brotliSize: true,
            template: 'treemap', // or 'sunburst', 'network'
          }),
        ]
      : []),
  ],
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    globalSetup: path.resolve(__dirname, 'vitest.global-setup.ts'),
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    environment: 'jsdom',
    testTimeout: 30000,
    reporters,
    outputFile,
    coverage: {
      provider: 'istanbul',
      reportsDirectory: coverageDirectory,
      exclude: [
        path.resolve(__dirname, '/node_modules/'),
        path.resolve(__dirname, '/test/'),
        path.resolve(__dirname, 'vitest.setup.ts'),
        path.resolve(__dirname, 'vitest.config.ts'),
        path.resolve(__dirname, 'vitest.global-setup.ts'),
        path.resolve(__dirname, '/packages/penny/src/test-utils'),
      ],
    },
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock', 'framer-motion'],
        },
      },
    },
  },
});
