import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { titreCss } from "../cssCommun.js";

export const kardias = [
  {
    terme: "Kardia du vent et de la foudre",
    competence: "kardia du vent",
    natures: [
      {
        terme: "Créer",
        seuil: 0,
      },
      {
        terme: "Déplacer",
        seuil: 4,
      },
      {
        terme: "Electrifier",
        seuil: 6,
      },
      {
        terme: "Compresser",
        seuil: 6,
      },
    ],
  },
  {
    terme: "Kardia du feu",
    competence: "kardia du feu",
    natures: [
      {
        terme: "Illuminer",
        seuil: 4,
      },
      {
        terme: "Enfumer",
        seuil: 4,
      },
      {
        terme: "Projeter",
        seuil: 6,
      },
      {
        terme: "Embraser",
        seuil: 8,
      },
    ],
  },
  {
    terme: "Kardia de l'eau et de la glace",
    competence: "kardia de l'eau",
    natures: [
      {
        terme: "Déplacer",
        seuil: 4,
      },
      {
        terme: "Créer",
        seuil: 6,
      },
      {
        terme: "Geler",
        seuil: 8,
      },
    ],
  },
  {
    terme: "Kardia de la terre",
    competence: "kardia de la terre",
    natures: [
      {
        terme: "Recomposer",
        seuil: 4,
      },
      {
        terme: "Déplacer",
        seuil: 6,
      },
      {
        terme: "Projectile",
        seuil: 8,
      },
    ],
  },
];

export const portees = [
  {
    terme: "Toucher",
    seuil: 0,
  },
  {
    terme: "10m",
    seuil: 4,
  },
  {
    terme: "50m",
    seuil: 6,
  },
  {
    terme: "100m",
    seuil: 8,
  },
  {
    terme: "500m",
    seuil: 10,
  },
  {
    terme: "1km",
    seuil: 12,
  },
];

export const puissances = [
  {
    terme: "1/9",
    seuil: 0,
  },
  {
    terme: "3/12",
    seuil: 4,
  },
  {
    terme: "5/15",
    seuil: 6,
  },
  {
    terme: "7/18",
    seuil: 8,
  },
  {
    terme: "9/21",
    seuil: 10,
  },
  {
    terme: "11/24",
    seuil: 12,
  },
];

export const diametres = [
  {
    terme: "50cm",
    seuil: 0,
  },
  {
    terme: "2m",
    seuil: 4,
  },
  {
    terme: "10m",
    seuil: 6,
  },
  {
    terme: "50m",
    seuil: 8,
  },
  {
    terme: "200m",
    seuil: 10,
  },
];

export class CompositionSort extends LitElement {
  static get formAssociated() {
    return true;
  }

  static properties = {
    kardia: { type: Object },
    portee: { type: Object, attribute: false },
    puissance: { type: Object, attribute: false },
    nature: { type: Object, attribute: false },
    diametre: { type: Object, attribute: false },
    descriptif: { type: String },
    diff: { type: String },
    value: { type: String },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${titreCss}
  `;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.kardia = null;
  }

  get actor() {
    return game.actors.get(this.actorId);
  }

  get difficulte() {
    return (
      (this.nature?.seuil || 0) +
      (this.portee?.seuil || 0) +
      (this.puissance?.seuil || 0) +
      (this.diametre?.seuil || 0)
    );
  }

  render() {
    return html`
      <h3>Kardia</h3>
      <ty-terme-choix
        .options=${kardias}
        @val-change=${this.selectKardia}
      ></ty-terme-choix>
      ${this.kardia ? this.renderParametreSort() : ""}
    `;
  }

  renderParametreSort() {
    return html`
      <h3>Nature</h3>
      <ty-terme-choix
        .options=${this.kardia.natures}
        @val-change=${this.selectNature}
      ></ty-terme-choix>
      <h3>Portée</h3>
      <ty-terme-choix
        .options=${portees}
        @val-change=${this.selectPortee}
      ></ty-terme-choix>
      <h3>Puissance/Seuil</h3>
      <ty-terme-choix
        .options=${puissances}
        @val-change=${this.selectPuissance}
      ></ty-terme-choix>
      <h3>Diametre</h3>
      <ty-terme-choix
        .options=${diametres}
        @val-change=${this.selectDiametre}
      ></ty-terme-choix>
      <center>
        <h3>Difficulté : ${this.difficulte}</h3>
      </center>
    `;
  }

  selectKardia(event) {
    this.kardia = event.detail;
    this.refreshDescriptif();
  }

  selectPortee(event) {
    this.portee = event.detail;
    this.refreshDescriptif();
  }

  selectNature(event) {
    this.nature = event.detail;
    this.refreshDescriptif();
  }

  selectPuissance(event) {
    this.puissance = event.detail;
    this.refreshDescriptif();
  }

  selectDiametre(event) {
    this.diametre = event.detail;
    this.refreshDescriptif();
  }

  refreshDescriptif() {
    this.diff = this.difficulte;
    this.descriptif = `
        <h2>${this.kardia?.terme}</h2>
        <br>
        <b>Nature :</b> ${this.nature?.terme} <br>
        <b>Portée :</b> ${this.portee?.terme} <br>
        <b>Puissance :</b> ${this.puissance?.terme} <br>
        <b>Diametre :</b> ${this.diametre?.terme} <br>
        <br>
        <center>
            <h3>Difficulté de ${this.diff} </h3>
        </center>`;
    this.value = {
      descriptif: this.descriptif,
      difficulte: this.value,
      kardia: this.kardia?.competence,
    };
    this.internals.setFormValue(this.value);
  }
}

export function declareCompositionSort() {
  customElements.define("ty-composition-sort", CompositionSort);
}
