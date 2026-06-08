import pennyConfig from '@melio/eslint-config-penny';

const config = [
  {
    ignores: ['eslint.config.mjs', 'eslint.config.js'],
  },
  ...pennyConfig,
];

export default config;



