import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from './converter.js';

export class Manoeuvre extends LitElement {
  static properties = {
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

    header {
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
      display: flex;
      justify-content: space-between;
    }

    article {
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
  }

  render() {
    console.warn(this.data);
    return html`
      <h2>${this.titre}</h2>
      <div class="container">
        ${this.data?.map((d) => this.renderManoeuvre(d))}
      </div>
      <div class="toolbar">
        <button>Lancer l'action</button><button>Faire la récupération</button>
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
            <label><input type="checkbox" /></label>
          </header>
          <article>
            <div class="test">
              ${manoeuvreData.attribut} - ${manoeuvreData.metier}
            </div>
            <div class="utilisations">
              Utilisations disponible :
              ${manoeuvreData.nbUtilisationsMax -
              manoeuvreData.nbUtilisationsActuel}
              / ${manoeuvreData.nbUtilisationsMax}
            </div>
          </article>
        </section>
      </ty-popover>
    `;
  }
}

export function declareManoeuvre() {
  customElements.define("manoeuvre-utilisation", Manoeuvre);
}
