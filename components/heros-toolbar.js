import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { buttonCss } from "./cssCommun.js";
import { Macro } from "../module/macro.js";

export class HerosToolbar extends LitElement {
  static properties = {
    actorId: { type: String },
    heros: { type: Boolean },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    ${buttonCss}

    button {
      padding: 0;
      height: 48px;
    }

    button:hover {
      filter: brightness(1.5);
    }

    button img {
      max-width: 48px;
    }
  `;

  constructor() {
    super();
  }

  get actor() {
    return game.actors.get(this.actorId);
  }

  render() {
    return html`
      ${this.heros
        ? html`<button @click=${this.effectuerTest}>
            <img
              src="systems/tylestel/assets/icons/test.png"
              title="Effectuer une action"
            />
          </button>`
        : ""}
      <button @click=${this.encaisserDommage}>
        <img
          src="systems/tylestel/assets/icons/dommage.png"
          title="Encaisser des dommages"
        />
      </button>
      <button @click=${this.regagnerVie}>
        <img
          src="systems/tylestel/assets/icons/soins.png"
          title="Regagner de la vie"
        />
      </button>
      <slot></slot>
    `;
  }

  async encaisserDommage() {
    Macro.takeDamage(this.actor);
  }

  async regagnerVie() {
    Macro.regainLife(this.actor);
  }

  async effectuerTest() {
    Macro.makeTest(this.actor);
  }
}

export function declareHerosToolbar() {
  customElements.define("ty-heros-toolbar", HerosToolbar);
}
