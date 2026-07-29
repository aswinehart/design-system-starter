import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ui-components',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
};
