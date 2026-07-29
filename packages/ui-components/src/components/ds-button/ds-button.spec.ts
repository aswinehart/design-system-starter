import { newSpecPage } from '@stencil/core/testing';
import { DsButton } from './ds-button';

describe('ds-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DsButton],
      html: `<ds-button>Click</ds-button>`,
    });
    expect(page.root).toEqualHtml(`<ds-button><mwc-button>Click</mwc-button></ds-button>`);
  });
});
