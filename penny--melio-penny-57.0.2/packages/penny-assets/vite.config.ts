import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

import baseConfig from '../../vite.config';

export default mergeConfig(
  defineConfig({
    plugins: [dts({ entryRoot: path.resolve(__dirname, 'src'), outDir: path.resolve(__dirname, 'dist') })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }),
  baseConfig
);
