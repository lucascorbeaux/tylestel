import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { executeManoeuvresMonstres } from "../services/dice.js";
import { htmlObjectConverter } from "./converter.js";
import { buttonCss, titreCss } from "./cssCommun.js";

export class ManoeuvreMonstre extends LitElement {
  static properties = {
    actorId: { type: String },
    titre: { type: String },
    data: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .card-manoeuvre {
      box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
        rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
    }

    article {
      flex: 1 1 100%;
    }

    .card-manoeuvre header {
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
      display: flex;
      justify-content: space-between;
    }

    .card-manoeuvre article {
      display: flex;
      justify-content: space-between;
    }

    .test {
      text-transform: capitalize;
    }

    .toolbar {
      display: flex;
      justify-content: space-evenly;
      gap: 1rem;
      margin-top: 0.4rem;
    }

    .toolbar > * {
      flex: 1;
    }

    .recuperation-btn {
      width: 100%;
    }

    .delete-btn {
      max-width: 6rem;
    }

    ${buttonCss}
    ${titreCss}
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  get visibleData() {
    return this.data;
  }

  get usingManoeuvre() {
    return this.visibleData.filter((d) => d.use);
  }

  get usingManoeuvreNonEpuise() {
    return this.usingManoeuvre.filter(
      (m) =>
        m.system.nbUtilisationsMax - m.system.nbUtilisationsActuel > 0 ||
        m.system.nbUtilisationsMax == -1
    );
  }

  render() {
    return html`
      <h2>${this.titre}</h2>
      <div class="container">
        ${this.visibleData?.map((d) => this.renderManoeuvre(d))}
      </div>
      ${this.renderToolbar()}
    `;
  }

  renderToolbar() {
    return html`
      <div class="toolbar">
        <button @click="${this.actionLaunch}">Lancer l'action</button>
      </div>
    `;
  }

  renderManoeuvre(manoeuvre) {
    const manoeuvreData = manoeuvre.system;
    return html`
      <ty-popover content=${manoeuvreData.description}>
        <section class="card-manoeuvre">
          <header>
            <span>${manoeuvre.name}</span>
            ${this.renderSelection(manoeuvre, manoeuvreData)}
          </header>
          <article>
            <div class="test">${manoeuvreData.attribut}</div>
            ${this.renderUtilisations(manoeuvreData)}
          </article>
        </section>
      </ty-popover>
    `;
  }

  renderUtilisations(manoeuvreData) {
    if (manoeuvreData.nbUtilisationsMax == -1) {
      return html` <div class="utilisations">Aucun limite d'utilisation</div> `;
    }

    return html`
      <div class="utilisations">
        Utilisations disponible :
        ${manoeuvreData.nbUtilisationsMax - manoeuvreData.nbUtilisationsActuel}
        / ${manoeuvreData.nbUtilisationsMax}
      </div>
    `;
  }

  renderSelection(manoeuvre, manoeuvreData) {
    return html` <label
        >Utiliser sur l'action<input
          type="checkbox"
          value="${manoeuvre._id}"
          @click="${this.toogleCheck}"
          ?checked=${manoeuvreData.use}
      /></label>

      <button
        class="delete-btn"
        data-manoeuvre="${manoeuvre._id}"
        @click=${this.deleteItem}
        type="button"
      >
        Supprimer
      </button>`;
  }

  toogleCheck(event) {
    const id = event.target.value;
    const manoeuvre = this.data.find((d) => d._id === id);
    manoeuvre.use = !manoeuvre.use;
  }

  async actionLaunch() {
    const manoeuvre = this.usingManoeuvre;

    if (this.usingManoeuvreNonEpuise.length != manoeuvre.length) {
      ui.notifications.error(`Une manoeuvre choisie est épuisée.`);
      return;
    }

    await executeManoeuvresMonstres(this.actorId, this.usingManoeuvre);
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", [manoeuvreId]);
  }
}

export function declareManoeuvreMonstre() {
  customElements.define("manoeuvre-monstre", ManoeuvreMonstre);
}
