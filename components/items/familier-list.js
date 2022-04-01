import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "../converter.js";
import { buttonCss, cardCss, icons, titreCss } from "../cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class FamilierList extends LitElement {
  static properties = {
    actorId: { type: String },
    familiers: {
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

    button {
      flex: 0 0;
    }

    .card article {
      flex-direction: column;
    }

    .attribut-container {
      display: flex;
      width: 100%;
    }

    .attribut-container .form-group {
      flex: 1 1 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
    }

    .description-container {
      display: flex;
      gap: 0.2rem;
    }

    .description-container div {
      flex: 1 1 100%;
    }
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  getItemSheet(itemId) {
    const actor = game.actors.get(this.actorId);
    return actor.items.get(itemId);
  }

  render() {
    return html`
      <h2>
        Familiers
        <button
          class="add-btn"
          title="Ajouter"
          @click=${this.addItem}
          type="button"
        >
          <i class="fas fa-plus"></i>
        </button>
      </h2>
      ${this.familiers.map((p) => this.renderFamilier(p))}
    `;
  }

  renderFamilier(item) {
    return html`
      <section class="card">
        <header>
          <span>${item.name}</span>
          <span>
            <button
              class="edit-btn"
              title="Editer"
              data-item="${item._id}"
              @click=${this.editItem}
              type="button"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="delete-btn"
              title="Supprimer"
              data-item="${item._id}"
              @click=${this.deleteItem}
              type="button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </span>
        </header>
        <article>
          <div class="attribut-container">
            ${this.renderPoints(item)} ${this.renderMaltraitance(item)}
          </div>
          <div class="description-container">
            <div>${unsafeHTML(item.data.description)}</div>
            <div>${unsafeHTML(item.data.actions)}</div>
          </div>
        </article>
      </section>
    `;
  }

  renderPoints(item) {
    return html`
      <div class="form-group">
        <label>Points de familiers</label>
        <button
          class="edit-btn"
          title="Retirer"
          data-item="${item._id}"
          @click=${this.removePoints}
          type="button"
        >
          <i class="fas fa-minus"></i>
        </button>

        <div>${item.data.points.current} / ${item.data.points.max}</div>

        <button
          class="edit-btn"
          title="Ajouter"
          data-item="${item._id}"
          @click=${this.addPoints}
          type="button"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `;
  }

  renderMaltraitance(item) {
    return html`
      <div class="form-group">
        <label>Maltraitance</label>
        <button
          class="edit-btn"
          title="Retirer"
          data-item="${item._id}"
          @click=${this.removeMaltraitance}
          type="button"
        >
          <i class="fas fa-minus"></i>
        </button>
        <div>${item.data.maltraitance}</div>
        <button
          class="edit-btn"
          title="Ajouter"
          data-item="${item._id}"
          @click=${this.addMaltraitance}
          type="button"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `;
  }

  async addItem() {
    const actor = game.actors.get(this.actorId);

    const items = await actor.createEmbeddedDocuments("Item", [
      {
        name: "Nouveau familier",
        img: "systems/tylestel/assets/icons/familier.png",
        type: "familier",
        data: {},
      },
    ]);

    items[0].sheet.render(true);
  }

  addMaltraitance(event) {
    const itemId = event.currentTarget.dataset.item;
    const item = this.getItemSheet(itemId);
    const newValue = item.data.data.maltraitance + 1;
    if (newValue >= 3) {
      ui.notifications.warn(`Votre familier est maltraité.`);
    }
    item.update({
      data: {
        maltraitance: newValue,
      },
    });
  }

  removeMaltraitance(event) {
    const itemId = event.currentTarget.dataset.item;
    const item = this.getItemSheet(itemId);
    const newValue = item.data.data.maltraitance - 1;
    if (newValue < 0) {
      return ui.notifications.error(`Impossible de diminuer en dessous de 0`);
    }
    item.update({
      data: {
        maltraitance: newValue,
      },
    });
  }

  addPoints(event) {
    const itemId = event.currentTarget.dataset.item;
    const item = this.getItemSheet(itemId);
    const newValue = item.data.data.points.current + 1;
    if (newValue > item.data.data.points.max) {
      return ui.notifications.error(`Impossible de dépasser le maximum`);
    }
    item.update({
      data: {
        points: { current: newValue },
      },
    });
  }

  removePoints(event) {
    const itemId = event.currentTarget.dataset.item;
    const item = this.getItemSheet(itemId);
    const newValue = item.data.data.points.current - 1;
    if (newValue < item.data.data.points.min) {
      return ui.notifications.error(`Impossible de diminuer en dessous de 0`);
    }
    item.update({
      data: {
        points: { current: newValue },
      },
    });
  }

  deleteItem(event) {
    const itemId = event.currentTarget.dataset.item;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", [itemId]);
  }

  editItem(event) {
    const itemId = event.currentTarget.dataset.item;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(itemId);
    item.sheet.render(true);
  }
}

export function declareFamilierList() {
  customElements.define("ty-familier-list", FamilierList);
}
