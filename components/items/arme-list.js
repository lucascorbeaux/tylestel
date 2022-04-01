import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "../converter.js";
import { buttonCss, cardCss, icons, titreCss } from "../cssCommun.js";
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
    .delete-btn,
    .edit-btn {
      width: 1.4rem;
      font-size: 1rem;
    }

    ${titreCss}
    ${buttonCss}
    ${cardCss}
    ${icons}

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
    return html`
      <h2>
        Armes
        <button
          class="add-btn"
          title="Ajouter"
          @click=${this.addItem}
          type="button"
        >
          <i class="fas fa-plus"></i>
        </button>
      </h2>
      ${this.armes.map((p) => this.renderArme(p))}
    `;
  }

  renderArme(arme) {
    return html`
      <section class="card">
        <header>
          <span>${arme.name}</span>
          <span>
            ${this.renderEtat(arme)}
            <button
              class="edit-btn"
              title="Editer"
              data-manoeuvre="${arme._id}"
              @click=${this.editItem}
              type="button"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="delete-btn"
              title="Supprimer"
              data-manoeuvre="${arme._id}"
              @click=${this.deleteItem}
              type="button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </span>
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

  renderEtat(arme) {
    if (arme.data.equipe) {
      return html`
        <button
          class="edit-btn"
          title="En main"
          data-manoeuvre="${arme._id}"
          @click=${this.toogleEtatItem}
          type="button"
        >
          <i class="fas fa-hand-back-fist"></i>
        </button>
      `;
    }
    return html`
      <button
        class="edit-btn"
        title="Dans le sac"
        data-manoeuvre="${arme._id}"
        @click=${this.toogleEtatItem}
        type="button"
      >
        <i class="fas fa-suitcase"></i>
      </button>
    `;
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", [manoeuvreId]);
  }

  async addItem() {
    const actor = game.actors.get(this.actorId);

    const items = await actor.createEmbeddedDocuments("Item", [
      {
        name: "Nouvel arme",
        img: "systems/tylestel/assets/icons/arme.png",
        type: "arme",
        data: {},
      },
    ]);

    items[0].sheet.render(true);
  }

  editItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(manoeuvreId);
    item.sheet.render(true);
  }

  toogleEtatItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(manoeuvreId);
    item.update({
      data: {
        equipe: !item.data.data.equipe,
      },
    });
  }
}

export function declareArmeList() {
  customElements.define("arme-list", ArmeList);
}
