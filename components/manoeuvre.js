import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { printManoeuvreAndLaunchDice } from "../services/dice.js";

export class Manoeuvre extends LitElement {
  static properties = {
    actorId: { type: String },
    titre: { type: String },
    modeSelection: { type: Boolean },
    data: { type: Object },
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

    button {
      background-color: white;
      border: none;
      flex: 1;
      padding: 0.2rem;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
        rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
        rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
        rgba(0, 0, 0, 0.07) 0px 32px 64px;
    }
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
    if (this.modeSelection) {
      return html` <div class="toolbar">
        <button>Enregistrer le choix</button>
      </div>`;
    }
    return html`
      <div class="toolbar">
        <button @click="${this.actionLaunch}">Lancer l'action</button
        ><button>Faire la récupération</button>
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
        Nombre d'utilisations : ${manoeuvreData.nbUtilisationsMax}
      </div>`;
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
        <label
          >Dans la main
          <input
            type="checkbox"
            value="${manoeuvre._id}"
            @click="${this.toogleActif}"
            ?checked=${manoeuvreData.actif}
        /></label>
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

  actionLaunch() {
    const manoeuvre = this.usingManoeuvre;
    if (!this.canExecute()) {
      ui.notifications.error(
        `Toutes les manoeuvres selectionnées doivent avoir le même test.`
      );
    } else {
      printManoeuvreAndLaunchDice(
        this.actorId,
        this.usingManoeuvre
      );
    }    
  }

  canExecute() {
    if (!this.usingManoeuvre.length) return false;
    const test = new Set(
      this.usingManoeuvre.map((m) => m.data.attribut + m.data.metier)
    );
    return test.size === 1;
  }
}

export function declareManoeuvre() {
  customElements.define("manoeuvre-utilisation", Manoeuvre);
}
