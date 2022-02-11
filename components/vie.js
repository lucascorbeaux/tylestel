import { LitElement, css, html, unsafeCSS } from "https://unpkg.com/lit?module";

const boxSize = "1.5rem";

export class CompteurVie extends LitElement {
  static properties = {
    max: { type: Number },
    current: { type: Number },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host .boxVie {
      box-sizing: border-box;
      height: ${unsafeCSS(boxSize)};
      width: ${unsafeCSS(boxSize)};
      border: 1px solid #d5d5d5;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #d5d5d5;
    }

    h3 {
      text-align: center;
    }
  `;

  constructor() {
    super();
  }

  get box() {
    return new Array(this.max)
      .fill(true)
      .map((_, index) => index < this.nbBlessure);
  }

  get nbBlessure() {
    return this.max - this.current;
  }

  get nbColonne() {
    return Math.floor(this.max / 5);
  }

  render() {
    return html`
      <style>
        .gridCompteurVie {
          display: grid;
          grid-template-columns: repeat(${this.nbColonne}, ${boxSize});
        }
      </style>
      <h3>Vie</h3>
      <div class="gridCompteurVie">
        ${this.box.map((b) => this.renderBox(b))}
      </div>
    `;
  }

  renderBox(box) {
    return html`<div class="boxVie">${box ? `X` : ""}</div>`;
  }
}

export function declareCompteurVie() {
  customElements.define("compteur-vie", CompteurVie);
}
