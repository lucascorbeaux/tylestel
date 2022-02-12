import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { buttonCss } from "./cssCommun.js";
import { launchDice } from "../services/dice.js";

export class HerosToolbar extends LitElement {
  static properties = {
    actorId: { type: String },
    heros: { type: Boolean }
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    ${buttonCss}
  `;

  constructor() {
    super();
  }

  get actor() {
    return game.actors.get(this.actorId);
  }

  render() {
    return html`
      <button @click=${this.encaisserDommage}>Encaisser des dommages</button>
      <button @click=${this.regagnerVie}>Regagner de la vie</button>
      ${ this.heros ? html`<button @click=${this.effectuerTest}>Effectuer une action</button>` : '' }
      <slot></slot>
    `;
  }

  async encaisserDommage() {
    openDialog("Encaisser des dommages", "number-dialog", this.actor, (data) => {
      const nbDommage = data.numField.value;
      if (!nbDommage || nbDommage <= 0) {
        ui.notifications.error(`Le nombre de dommage doit être positif`);
      }
      const actor = this.actor;
      const currentVieRessource = actor.data.data.vie;

      updateActorData(actor, "vie", {
        ...currentVieRessource,
        current: currentVieRessource.current - Number(nbDommage),
      });
    });
  }

  async regagnerVie() {
    openDialog("Regagner de la vie", "number-dialog", this.actor, (data) => {
      const nbVie = data.numField.value;
      if (!nbVie || nbVie <= 0) {
        ui.notifications.error(`Le nombre de pts regagné doit être positif`);
      }
      const actor = this.actor;
      const currentVieRessource = actor.data.data.vie;

      updateActorData(actor, "vie", {
        ...currentVieRessource,
        current: currentVieRessource.current + Number(nbVie),
      });
    });
  }

  async effectuerTest() {
    openDialog("Effectuer une action", "choix-test", this.actor, (data) => {
      const attribut = data.attribut.value;
      const metier = data.metier.value;
      launchDice(this.actorId, attribut, metier);
    });
  }
}


export function updateActorData(actor, key, updatedProperties) {
    const data = { data: {} };
    data.data[key] = updatedProperties;
    actor.update(data);
}

export async function openDialog(title, template, actor, callback) {
    const urlTemplate = `systems/tylestel/templates/dialog/${template}.html`;
    const content = await renderTemplate(urlTemplate, {actor});

    return new Promise((resolve) => {
        new Dialog({
          title,
          content,
          buttons: {
            std: {
              label: "Valider",
              callback: (html) => {
                  const dialogData = html[0].querySelector('form');
                  callback(dialogData);
              },
            },
          },
          close: (html) => {
            resolve();
          },
        }).render(true);
    });
}

export function declareHerosToolbar() {
  customElements.define("ty-heros-toolbar", HerosToolbar);
}
