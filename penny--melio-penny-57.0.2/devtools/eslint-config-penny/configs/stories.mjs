const storiesConfig = [
  {
    files: ['**/*.stories.*'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'max-lines': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['**/stories/**/*.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];

export default storiesConfig;
