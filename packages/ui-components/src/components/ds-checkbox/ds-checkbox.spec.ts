import { newSpecPage } from '@stencil/core/testing';
import { DsCheckbox } from './ds-checkbox';

describe('ds-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DsCheckbox],
      html: `<ds-checkbox></ds-checkbox>`,
    });
    expect(page.root).toEqualHtml(`<ds-checkbox><label class="ds-checkbox"><mwc-checkbox></mwc-checkbox><span class="ds-checkbox-label"></span></label></ds-checkbox>`);
  });
});
