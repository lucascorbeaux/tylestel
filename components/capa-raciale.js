import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module";
import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "./converter.js";
import { buttonCss, cardCss, icons } from "./cssCommun.js";

export class CapaciteRaciale extends LitElement {
  static properties = {
    race: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${buttonCss}
    ${cardCss}
    ${icons}

    .card article {
      display: block;
    }
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  get description() {
    return this.race?.system?.description;
  }

  render() {
    if (this.race) {
      return this.renderCard();
    }
    return "";
  }

  renderCard() {
    return html`
      <section class="card">
        <article>${unsafeHTML(this.description)}</article>
      </section>
    `;
  }
}

export function declareCapaciteRaciale() {
  customElements.define("ty-capacite-raciale", CapaciteRaciale);
}
