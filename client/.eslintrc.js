module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "no-class-assign": "off",
    "arrow-body-style": "off",
    "max-len": "off",
    "class-methods-use-this": "off",
  },
};
