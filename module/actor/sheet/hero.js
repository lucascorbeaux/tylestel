import { dieux } from "../../data.js";

export default class HeroSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "actor", "tylestel", "heros"],
      template: "systems/tylestel/templates/sheet/heros.html",
      width: 900,
      height: 830,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing player character data");
    
    sheetData.dieux = dieux;
    
    console.debug(sheetData);
    return sheetData;
  }
}