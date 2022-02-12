import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "../converter.js";
import { buttonCss, cardCss } from "../cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class ArmureList extends LitElement {
  static properties = {
    actorId: { type: String },
    armures: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .delete-btn {
      max-width: 6rem;
    }

    ${buttonCss}
    ${cardCss}

    .card article {
      flex-direction: column;
    }

    .attribut-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  render() {
    return html` ${this.armures.map((p) => this.renderArmure(p))} `;
  }

  renderArmure(item) {
    return html`
      <section class="card">
        <header>
          <span>${item.name}</span>
          <button
            class="delete-btn"
            data-manoeuvre="${item._id}"
            @click=${this.deleteItem}
            type="button"
          >
            Supprimer
          </button>
        </header>
        <article>
          <div class="attribut-container">
            <span><b>Résistance : </b> ${item.data.resistance}</span>
          </div>
          <div>${unsafeHTML(item.data.description)}</div>
        </article>
      </section>
    `;
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteOwnedItem(manoeuvreId);
  }
}

export function declareArmureList() {
  customElements.define("armure-list", ArmureList);
}
