import {
  LitElement,
  css,
  html,
} from "https://unpkg.com/lit?module";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class Manoeuvre extends LitElement {
  static properties = {
    content: { type: String },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .popover {
      box-sizing: border-box;
      opacity: 0;
      visibility: hidden;
      position: absolute;
      background-color: #F3F3F3;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px,
        rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
        rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
      border-radius: 0.25rem;
      padding: 0.2rem 0.6rem;
      height: 3rem;
      top: -3.2rem;
      font-size: 0.8rem;
      width: 96%;
      left: 2%;
      transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
      z-index: 10;
    }
    :host {
      display: block;
      position: relative;
    }
    :host(:hover) .popover {
      opacity: 1;
      visibility: visible;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <slot></slot>
      ${this.renderPopover()}
    `;
  }

  renderPopover() {
    if (this.content) {
      return html`<div class="popover">${unsafeHTML(this.content)}</div>`;
    }
    return "";
  }
}

export function declarePopover() {
  customElements.define("ty-popover", Manoeuvre);
}
