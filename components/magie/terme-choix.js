import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { buttonCss } from "../cssCommun.js";

export class TermeChoix extends LitElement {
  static properties = {
    options: { type: Array },
    value: { type: Object },
  };

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
  :host {
      width: 100%;
      display: flex;
  }

  ${buttonCss}

  button {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.1em;
  }

  .subtitle {
      color: rgba(0,0,0,0.5);
      font-size: 0.8em;
  }
  `;

  constructor() {
    super();
  }

  render() {
    return this.options.map((option) => this.renderChoix(option));
  }

  renderChoix(option) {
    return html`<button
      @click=${() => this.selectOption(option)}
      .data-option=${option}
      class="${option.terme === this.value?.terme ? `active` : ''}"
    >
      ${option.terme}
      ${option.seuil ? html`<span class="subtitle">+${option.seuil}</span>` : ''}
    </button>`;
  }

  selectOption(option) {
    this.value = option;
    this.dispatchEvent(
        new CustomEvent("val-change", {
            detail: this.value
        })
    );
  }
}

export function declareTermeChoix() {
  customElements.define("ty-terme-choix", TermeChoix);
}
