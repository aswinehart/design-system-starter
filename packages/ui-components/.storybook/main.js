module.exports = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/web-components',
};
