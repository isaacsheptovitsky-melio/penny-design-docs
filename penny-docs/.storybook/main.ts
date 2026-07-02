import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

const require = createRequire(import.meta.url);

// Fix for Storybook 10 + pnpm: MDX compiler emits file:// URLs that Rollup can't resolve.
// https://github.com/storybookjs/storybook/issues/33118#issuecomment-3563334686
function resolveFileProtocolPlugin(): Plugin {
  return {
    name: 'fix-mdx-react-shim',
    enforce: 'pre',
    resolveId(source) {
      if (source.startsWith('file://') && source.includes('mdx-react-shim.js')) {
        return new URL(source).pathname;
      }
      return null;
    },
  };
}

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
    options: {},
  },
  refs: {
    '@chakra-ui/react': { disable: true },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.unshift(resolveFileProtocolPlugin());

    // Deduplicate React to prevent multiple instances across Vite's pre-bundle
    // caches (one for Storybook's renderer, one for addons/preview). Without
    // this, Chakra UI's ThemeProvider gets a different React copy than
    // Storybook's renderer, causing "Cannot read properties of null (reading
    // 'useMemo')" on every page.
    config.resolve = config.resolve ?? {};
    config.resolve.dedupe = ['react', 'react-dom', 'react-dom/client'];

    // GitHub Pages serves from /penny-docs/ — set base so all assets resolve correctly.
    if (process.env.GITHUB_ACTIONS) {
      config.base = '/penny-design-docs/';
    }

    return config;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
