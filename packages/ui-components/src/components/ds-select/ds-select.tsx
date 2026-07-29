import { Component, Prop, h } from '@stencil/core';
import '@material/web/select/select.js';
import '@material/web/list/list-item.js';

@Component({
  tag: 'ds-select',
  styleUrl: 'ds-select.css',
  shadow: false,
})
export class DsSelect {
  @Prop() value: string = '';
  render() {
    // Use Material Web Component md-select. Child items should be provided
    // as <md-list-item> elements within the slot.
    return (
      <md-select class="ds-select" value={this.value}>
        <slot />
      </md-select>
    );
  }
}
