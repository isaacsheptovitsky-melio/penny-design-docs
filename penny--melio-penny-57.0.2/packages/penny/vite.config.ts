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

        // Use lightweight Lottie player to reduce bundle size:
        // https://github.com/airbnb/lottie-web/wiki/Lottie-Light
        'lottie-web': 'lottie-web/build/player/lottie_light.js',
      },
    },
  }),
  baseConfig
);
