import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "../converter.js";
import { buttonCss, cardCss } from "../cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class ArmeList extends LitElement {
  static properties = {
    actorId: { type: String },
    armes: {
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
    return html` ${this.armes.map((p) => this.renderArme(p))} `;
  }

  renderArme(arme) {
    return html`
      <section class="card">
        <header>
          <span>${arme.name}</span>
          <button
            class="delete-btn"
            data-manoeuvre="${arme._id}"
            @click=${this.deleteItem}
            type="button"
          >
            Supprimer
          </button>
        </header>
        <article>
          <div class="attribut-container">
            <span><b>Dégâts : </b> ${arme.data.degats}</span>
            <span><b>Initiative : </b> ${arme.data.initiative}</span>
            <span><b>Encaissement : </b> ${arme.data.encaissement}</span>
            <span><b>Portée : </b> ${arme.data.portee}</span>
          </div>
          <div>${unsafeHTML(arme.data.description)}</div>
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

export function declareArmeList() {
  customElements.define("arme-list", ArmeList);
}
