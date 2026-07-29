import { Component, Prop, h } from '@stencil/core';
import '@material/web/button/filled-button.js';

@Component({
  tag: 'ds-button',
  styleUrl: 'ds-button.css',
  shadow: false,
})
export class DsButton {
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled: boolean = false;

  render() {
    // Use Material Web Component inside Stencil wrapper. Stencil uses light DOM
    // so the MWC element's own styles and behavior load correctly.
    return (
      <md-filled-button disabled={this.disabled}>
        <slot />
      </md-filled-button>
    );
  }
}
