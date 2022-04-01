import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "./converter.js";
import { buttonCss, cardCss, icons, titreCss } from "./cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class PouvoirList extends LitElement {
  static properties = {
    actorId: { type: String },
    title: { type: String },
    type: { type: String },
    pouvoirs: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .delete-btn,
    .edit-btn {
      width: 1.4rem;
      font-size: 1rem;
    }

    ${titreCss}
    ${buttonCss}
    ${cardCss}
    ${icons}
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  render() {
    return html`
      <h2>
        ${this.title}
        <button
          class="add-btn"
          title="Ajouter"
          @click=${this.addItem}
          type="button"
        >
          <i class="fas fa-plus"></i>
        </button>
      </h2>
      ${this.pouvoirs.map((p) => this.renderPouvoir(p))}
    `;
  }

  renderPouvoir(pouvoir) {
    return html`
      <section class="card">
        <header>
          <span>${pouvoir.name}</span>
          <span>
            <button
              class="edit-btn"
              title="Editer"
              data-manoeuvre="${pouvoir._id}"
              @click=${this.editItem}
              type="button"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="delete-btn"
              title="Supprimer"
              data-manoeuvre="${pouvoir._id}"
              @click=${this.deleteItem}
              type="button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </span>
        </header>
        <article>${unsafeHTML(pouvoir.data.description)}</article>
      </section>
    `;
  }

  async addItem() {
    const actor = game.actors.get(this.actorId);

    const items = await actor.createEmbeddedDocuments("Item", [
      {
        name: `${this.type}`,
        img: `systems/tylestel/assets/icons/${this.type}.png`,
        type: this.type,
        data: {},
      },
    ]);

    items[0].sheet.render(true);
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", [manoeuvreId]);
  }

  editItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(manoeuvreId);
    item.sheet.render(true);
  }
}

export function declarePouvoirList() {
  customElements.define("pouvoir-list", PouvoirList);
}
