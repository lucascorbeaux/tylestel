import { getItems } from "../helper.js";
export default class ActorTylestel extends Actor {
  /** @override */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;

    if (actorData.type === "heros") {
      data.vie = this.prepareVieData(data);
      data.malusEtat = Object.values(data.etats)
        .filter((e) => e.actif)
        .reduce((prev, curr) => prev + curr.malus, 0);
      data.valeurArmure = this.calculValeurArmure();
      data.modificateurInitiative = this.calculModificateurInitiative();
      const perception = data.attributs.perception;
      const agilite = data.attributs.agilité;
      data.initRoll = `1d6x+1d6+${perception}+${agilite}-${data.malusEtat}+${data.modificateurInitiative}`;
    }

    if (actorData.type === "monstres") {
      data.vie.current = this.validateMinMaxData(
        data.vie.current,
        data.vie.min,
        data.vie.max
      );
      data.valeurArmure = data.resistance;
      const corps = data.initiative;
      data.initRoll = `${corps}`;
    }
  }

  /** @inheritdoc */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    this.data.token.update({ vision: true, actorLink: true, disposition: 1 });
  }

  validateMinMaxData(value, min, max) {
    if (parseInt(value) > parseInt(max)) {
      return max;
    } else if (parseInt(value) < parseInt(min)) {
      return min;
    }
    return value;
  }

  prepareVieData(data) {
    const vieRessource = data.vie;
    const viePerdu =
      vieRessource.current > vieRessource.max
        ? 0
        : vieRessource.max - vieRessource.current;
    const min = vieRessource.min;
    const nbColonneSupplementaire = Math.floor(data.attributs.endurance / 3);
    const max = (2 + nbColonneSupplementaire) * 5;
    const current = this.validateMinMaxData(max - viePerdu, min, max);
    return {
      min,
      max,
      current,
    };
  }

  calculValeurArmure() {
    return getItems(this.data, "armure")
      .filter((a) => a.data.data.equipe)
      .map((a) => a.data.data.resistance)
      .reduce((prev, curr) => Math.max(prev, curr), 0);
  }

  calculModificateurInitiative() {
    return (
      getItems(this.data, "arme")
        .filter((a) => a.data.data.equipe)
        .map((a) => a.data.data.initiative)
        .reduce((prev, curr) => {
          if (!prev) {
            return curr;
          }
          return Math.min(prev, curr);
        }, null) || 0
    );
  }
}
