import { newSpecPage } from '@stencil/core/testing';
import { DsSelect } from './ds-select';

describe('ds-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DsSelect],
      html: `<ds-select><mwc-list-item value="1">One</mwc-list-item></ds-select>`,
    });
    expect(page.root).toEqualHtml(`<ds-select><mwc-select class="ds-select"><mwc-list-item value="1">One</mwc-list-item></mwc-select></ds-select>`);
  });
});
