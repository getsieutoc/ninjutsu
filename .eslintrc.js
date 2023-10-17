module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    'react/display-name': 'off',
    'no-console': 1, //"off" or 0 - turn the rule off , "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code), "error" or 2 - turn the rule on as an error (exit code will be 1)
  },
};
