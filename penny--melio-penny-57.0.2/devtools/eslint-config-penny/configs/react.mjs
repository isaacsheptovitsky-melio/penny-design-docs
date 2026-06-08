import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const reactConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        JSX: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...(reactPlugin.configs?.['recommended']?.rules || {}),
      ...(reactHooksPlugin.configs?.['recommended']?.rules || {}),
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-boolean-value': 'error',
    },
  },
];

export default reactConfig;
