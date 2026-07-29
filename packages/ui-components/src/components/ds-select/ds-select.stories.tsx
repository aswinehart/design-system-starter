import { h } from '@stencil/core';

export default { title: 'Components/Select' };

export const Default = () => (
  <ds-select>
    <mwc-list-item value="1">One</mwc-list-item>
    <mwc-list-item value="2">Two</mwc-list-item>
  </ds-select>
);
