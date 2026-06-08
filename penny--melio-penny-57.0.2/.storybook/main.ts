import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

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

const S3_THEMES_CONFIG_BASE_URL = 'https://production-configuration-manager.s3.us-east-1.amazonaws.com';

const config: StorybookConfig = {
  stories: [
    '../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/**/src/**/*.mdx',
    '../devtools/storybook-utils/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('storybook-addon-pseudo-states'),
    getAbsolutePath('@chromatic-com/storybook'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  staticDirs: ['../public', '.', { from: '../packages/penny-assets/src/assets', to: '/assets' }],

  framework: getAbsolutePath('@storybook/react-vite'),

  features: {
    developmentModeForBuild: true,
  },

  refs: {
    '@chakra-ui/react': { disable: true },
  },

  viteFinal(config, { configType }) {
    // Add plugin to resolve file:// URLs from MDX compiler (needed for pnpm + Storybook 10)
    // https://github.com/storybookjs/storybook/issues/33118#issuecomment-3563334686
    config.plugins = config.plugins || [];
    config.plugins.unshift(resolveFileProtocolPlugin());

    // Merge custom configuration into the default config
    // config.resolve is not pre-initialized in storybook 10.3.x
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, '../packages/penny/src'),
    };

    config.define = {
      ...config.define,
      __USE_S3THEMES__: JSON.stringify('TRUE'),
    };

    // Add dev server proxy configuration for S3 themes only in development
    if (configType === 'DEVELOPMENT') {
      if (!config.server) {
        config.server = {};
      }

      config.server.proxy = {
        ...config.server.proxy,
        // Proxy API requests for themes to S3 bucket
        '/api/themes': {
          target: S3_THEMES_CONFIG_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/themes/, ''),
        },
      };
    }

    return config;
  },

  // We're using it to hide some stories only in production
  // https://storybook.js.org/docs/api/main-config-manager-head
  // head arg constant head in `manager-head.html`
  managerHead: (head, { configType }) => {
    let hideInternalStoriesHead = '';
    if (configType === 'PRODUCTION') {
      hideInternalStoriesHead = ['chromatic', 'storybook-utils-components', 'internal-components', 'penny-assets']
        .map(
          (id) => `
               <!--hide story group title-->
               <style>[id="${id}"]{display: none !important}</style>
               <!--hide stories with group-->
               <style>[data-parent-id="${id}"]{display: none !important}</style>
               <!--hide stories with group in search result-->
               <style>[data-id^="${id}"]{display: none !important}</style>
            `
        )
        .join('\n');
    }

    return `
      ${head}
      ${hideInternalStoriesHead}
    `;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
