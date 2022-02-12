import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "./converter.js";
import { buttonCss } from "./cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class PouvoirList extends LitElement {
  static properties = {
    actorId: { type: String },
    pouvoirs: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .card {
      box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
        rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
    }
    .card header {
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
      display: flex;
      justify-content: space-between;
    }

    .card article {
      display: flex;
      justify-content: space-between;
    }

    .delete-btn {
      max-width: 6rem;
    }

    ${buttonCss}
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  render() {
    return html` ${this.pouvoirs.map((p) => this.renderPouvoir(p))} `;
  }

  renderPouvoir(pouvoir) {
    return html`
      <section class="card">
        <header>
          <span>${pouvoir.name}</span>
          <button
            class="delete-btn"
            data-manoeuvre="${pouvoir._id}"
            @click=${this.deleteItem}
            type="button"
          >
            Supprimer
          </button>
        </header>
        <article>${unsafeHTML(pouvoir.data.description)}</article>
      </section>
    `;
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteOwnedItem(manoeuvreId);
  }
}

export function declarePouvoirList() {
  customElements.define("pouvoir-list", PouvoirList);
}
