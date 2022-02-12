import {
  encodeToLitObject,
  getActions,
  getReactions
} from "../../helper.js";

export default class MonstreSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "actor", "tylestel", "heros", "monstres"],
      template: "systems/tylestel/templates/sheet/monstres.html",
      width: 900,
      height: 830,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main",
        },
      ],
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing monster character data");
    
    sheetData.actions = encodeToLitObject(getActions(sheetData));
    sheetData.reactions = encodeToLitObject(getReactions(sheetData));
    
    console.debug(sheetData);
    return sheetData;
  }
}

