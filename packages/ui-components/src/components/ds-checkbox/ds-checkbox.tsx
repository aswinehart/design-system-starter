import { Component, Prop, h } from '@stencil/core';
import '@material/web/checkbox/checkbox.js';

@Component({
  tag: 'ds-checkbox',
  styleUrl: 'ds-checkbox.css',
  shadow: false,
})
export class DsCheckbox {
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;

  render() {
    return (
      <label class="ds-checkbox">
        <md-checkbox checked={this.checked} disabled={this.disabled}></md-checkbox>
        <span class="ds-checkbox-label"><slot /></span>
      </label>
    );
  }
}
