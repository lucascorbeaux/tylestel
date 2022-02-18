import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "./converter.js";
import { buttonCss, titreCss } from "./cssCommun.js";

export class ManoeuvreList extends LitElement {
  static properties = {
    actorId: { type: String },
    modeSelection: { state: true },
    nbActions: { type: Number },
    nbReactions: { type: Number },
    actions: {
      converter: htmlObjectConverter,
    },
    reactions: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${buttonCss}
    ${titreCss}
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  toogleModeSelection() {
    this.modeSelection = !this.modeSelection;
  }

  render() {
    return html`
      <button @click="${this.toogleModeSelection}">
        ${this.modeSelection
          ? "Votre main de manoeuvres"
          : "Choisir les manoeuvres"}
      </button>
      <manoeuvre-utilisation
        .data=${this.actions}
        .modeSelection=${this.modeSelection}
        actorId="${this.actorId}"
        titre="Actions"
        nbCartes="${this.nbActions}"
      ></manoeuvre-utilisation>
      <manoeuvre-utilisation
        .data=${this.reactions}
        .modeSelection=${this.modeSelection}
        actorId="${this.actorId}"
        titre="Reactions"
        nbCartes="${this.nbReactions}"
      ></manoeuvre-utilisation>
    `;
  }
}

export function declareManoeuvreList() {
  customElements.define("manoeuvre-list", ManoeuvreList);
}
