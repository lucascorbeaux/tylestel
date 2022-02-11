import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "./converter.js";

export class ManoeuvreList extends LitElement {
  static properties = {
    actorId: {type: String},
    modeSelection: { state: true },
    actions: {
      converter: htmlObjectConverter,
    },
    reactions: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css``;

  constructor() {
    super();
    this.modeSelection = false;
  }

  toogleModeSelection() {
    this.modeSelection = !this.modeSelection;
  }

  render() {
    return html`
      <button @click="${this.toogleModeSelection}">Mode selection</button>
      <manoeuvre-utilisation
        .data=${this.actions}
        .modeSelection=${this.modeSelection}
        actorId="${this.actorId}"
        titre="Actions"
      ></manoeuvre-utilisation>
      <manoeuvre-utilisation
        .data=${this.reactions}
        .modeSelection=${this.modeSelection}
        actorId="${this.actorId}"
        titre="Reactions"
      ></manoeuvre-utilisation>
    `;
  }
}

export function declareManoeuvreList() {
  customElements.define("manoeuvre-list", ManoeuvreList);
}
