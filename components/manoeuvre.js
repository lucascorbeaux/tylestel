import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { buttonCss, titreCss, icons } from "./cssCommun.js";
import { executeManoeuvres } from "../services/dice.js";

export class Manoeuvre extends LitElement {
  static properties = {
    actorId: { type: String },
    titre: { type: String },
    modeSelection: { type: Boolean },
    data: { type: Object },
    nbCartes: { type: Number }
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

    ${icons}
    ${buttonCss}
    ${titreCss}
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  get visibleData() {
    return this.modeSelection
      ? this.data
      : this.data.filter((d) => d.data.actif);
  }

  get usingManoeuvre() {
    return this.visibleData.filter((d) => d.use);
  }

  get usingManoeuvreNonEpuise() {
    return this.usingManoeuvre.filter(
      (m) =>
        m.data.nbUtilisationsMax - m.data.nbUtilisationsActuel > 0 ||
        m.data.nbUtilisationsMax == -1
    );
  }

  render() {
    return html`
      <style></style>
      <h2>${this.titre} (${this.nbCartes} manoeuvres)</h2>
      <div class="container">
        ${this.visibleData?.map((d) => this.renderManoeuvre(d))}
      </div>
      ${this.renderToolbar()}
    `;
  }

  renderToolbar() {
    if (this.modeSelection) {
      return html` <div class="toolbar">
        <button @click=${this.save}>Enregistrer le choix</button>
      </div>`;
    }
    return html`
      <div class="toolbar">
        <button @click="${this.actionLaunch}">Lancer l'action</button>
        <ty-popover content="Vous pouvez récupérer jusqu'à deux manoeuvres."
          ><button class="recuperation-btn" @click="${this.recuperer}">
            Récupérer les actions
          </button>
        </ty-popover>
      </div>
    `;
  }

  renderManoeuvre(manoeuvre) {
    const manoeuvreData = manoeuvre.data;
    return html`
      <ty-popover content=${manoeuvreData.description}>
        <section class="card-manoeuvre">
          <header>
            <span>${manoeuvre.name}</span>
            ${this.renderSelection(manoeuvre, manoeuvreData)}
          </header>
          <article>
            <div class="test">
              ${manoeuvreData.attribut} - ${manoeuvreData.metier}
            </div>
            ${this.renderUtilisations(manoeuvreData)}
          </article>
        </section>
      </ty-popover>
    `;
  }

  renderUtilisations(manoeuvreData) {
    if (this.modeSelection) {
      return html` <div class="utilisations">
        ${manoeuvreData.nbUtilisationsMax == -1
          ? "Aucune limite d'utilisation"
          : `Nombre d'utilisations : ${manoeuvreData.nbUtilisationsMax}`}
      </div>`;
    }

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
    if (this.modeSelection) {
      return html`
        <div class="col">
          <label
            >Dans la main
            <input
              type="checkbox"
              value="${manoeuvre._id}"
              @click="${this.toogleActif}"
              ?checked=${manoeuvreData.actif}
          /></label>

          <button
            class="edit-btn"
            title="Editer"
            data-manoeuvre="${manoeuvre._id}"
            @click=${this.editItem}
            type="button"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="delete-btn"
            title="Supprimer"
            data-manoeuvre="${manoeuvre._id}"
            @click=${this.deleteItem}
            type="button"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    }
    return html` <label
      >Utiliser sur l'action<input
        type="checkbox"
        value="${manoeuvre._id}"
        @click="${this.toogleCheck}"
        ?checked=${manoeuvreData.use}
    /></label>`;
  }

  toogleCheck(event) {
    const id = event.target.value;
    const manoeuvre = this.data.find((d) => d._id === id);
    manoeuvre.use = !manoeuvre.use;
  }

  toogleActif(event) {
    const id = event.target.value;
    const manoeuvre = this.data.find((d) => d._id === id);
    manoeuvre.data.actif = !manoeuvre.data.actif;
  }

  async actionLaunch() {
    const manoeuvre = this.usingManoeuvre;

    if (this.usingManoeuvreNonEpuise.length != manoeuvre.length) {
      ui.notifications.error(`Une manoeuvre choisie est épuisée.`);
      return;
    }

    await executeManoeuvres(this.actorId, this.usingManoeuvre);
  }

  recuperer() {
    const manoeuvre = this.usingManoeuvre;
    if (this.usingManoeuvreNonEpuise.length) {
      ui.notifications.error(
        "Les manoeuvres doivent avoir été entièrement utilisé"
      );
      return;
    }

    const actor = game.actors.get(this.actorId);

    manoeuvre.forEach((manoeuvre) => {
      const item = actor.items.get(manoeuvre._id);
      item.update({
        data: { nbUtilisationsActuel: 0 },
      });
    });
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", manoeuvreId);
  }

  editItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(manoeuvreId);
    item.sheet.render(true);
  }

  save() {
    const actor = game.actors.get(this.actorId);

    const manoeuvreActive = this.data.filter(m => m.data.actif && m.data.nbUtilisationsMax > 0);

    if(manoeuvreActive.length > this.nbCartes) {
      ui.notifications.error(`Vous avez trop de manoeuvre dans votre main.`);
      return;
    }

    this.data.forEach((manoeuvre) => {
      const item = actor.items.get(manoeuvre._id);
      item.update({ data: { actif: manoeuvre.data.actif } });
    });
  }
}

export function declareManoeuvre() {
  customElements.define("manoeuvre-utilisation", Manoeuvre);
}
