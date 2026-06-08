#!/usr/bin/env node

const fs = require('fs');

const filePath = `${process.cwd()}/package.json`;
// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(filePath);

const targetPackageJson = {
  ...packageJson,
  main: 'dist/index.js',
  module: 'dist/index.mjs',
  types: 'dist/index.d.ts',
  publishConfig: {
    access: 'public',
  },
  files: ['dist'],
};

fs.writeFileSync(filePath, JSON.stringify(targetPackageJson, null, 2));
