module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  rules: {
    'body-leading-blank': [2, 'never'],
    'footer-leading-blank': [2, 'never'],
  },
};
