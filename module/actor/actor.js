export default class ActorTylestel extends Actor {
  /** @override */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;

    data.vie = this.prepareVieData(data);
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
    const viePerdu = vieRessource.current > vieRessource.max ? 0 : vieRessource.max - vieRessource.current;
    const min = vieRessource.min;
    const nbColonneSupplementaire = Math.floor((data.attributs.endurance) / 3);
    const max = (2 + nbColonneSupplementaire) * 5;
    const current = this.validateMinMaxData(max - viePerdu, min, max);
    return {
      min,
      max,
      current
    };
  }
}
