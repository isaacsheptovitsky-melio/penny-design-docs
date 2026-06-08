const BABEL_ENV = process.env.BABEL_ENV;
const isCJS = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';
const isESM = BABEL_ENV !== undefined && BABEL_ENV === 'esm';

module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/env',
      {
        loose: isCJS,
        modules: isCJS ? 'commonjs' : false,
        targets: {
          node: 'current',
          esmodules: isESM ? true : undefined,
        },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
  ];

  return {
    presets,
    plugins,
  };
};
