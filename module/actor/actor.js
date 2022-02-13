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
      const perception = data.attributs.perception;
      const agilite = data.attributs.agilité;
      data.initRoll = `1d6x+1d6+${perception}+${agilite}-${data.malusEtat}`;
    }

    if (actorData.type === "monstres") {
      data.vie.current = this.validateMinMaxData(data.vie.current, data.vie.min, data.vie.max);
      const corps = data.initiative;
      data.initRoll = `${corps}`;
    }
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

}
