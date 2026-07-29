import { h } from '@stencil/core';

export default {
  title: 'Components/Button',
};

export const Default = () => <ds-button>Primary</ds-button>;
export const Disabled = () => <ds-button disabled>Disabled</ds-button>;
