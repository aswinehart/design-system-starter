import { Component, Prop, h } from '@stencil/core';
import '@material/web/textfield/filled-text-field.js';

@Component({
  tag: 'ds-input',
  styleUrl: 'ds-input.css',
  shadow: false,
})
export class DsInput {
  @Prop() value: string = '';
  @Prop() placeholder: string = '';
  @Prop() disabled: boolean = false;

  render() {
    return (
      <md-filled-text-field class="ds-input" value={this.value} placeholder={this.placeholder} disabled={this.disabled}></md-filled-text-field>
    );
  }
}
