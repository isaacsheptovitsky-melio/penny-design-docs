import { build, context } from 'esbuild';

const buildOptions = {
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: 'dist/index.js',
  sourcemap: true,
  bundle: true,
  minify: false,
  keepNames: true,
  external: ['@modelcontextprotocol/sdk', 'undici', 'zod', 'axios', 'axios-retry'],
  alias: {
    '@': './src',
  },
  loader: {
    '.md': 'text',
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
};

if (process.argv.includes('--watch')) {
  const ctx = await context(buildOptions);
  await ctx.watch();
} else {
  await build(buildOptions);
}
