import { dieux } from "../../data.js";
import {
  encodeToLitObject,
  getActions,
  getActiveActions,
  getActiveReactions,
  getPouvoir,
  getReactions,
} from "../../helper.js";

export default class HeroSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "actor", "tylestel", "heros"],
      template: "systems/tylestel/templates/sheet/heros.html",
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
    console.log("Tylestel | Initializing player character data");
    
    sheetData.dieux = dieux;
    sheetData.pouvoirs = encodeToLitObject(getPouvoir(sheetData));
    sheetData.actions = encodeToLitObject(getActions(sheetData));
    sheetData.reactions = encodeToLitObject(getReactions(sheetData));
    sheetData.activeActions = encodeToLitObject(getActiveActions(sheetData));
    sheetData.activeReactions = encodeToLitObject(getActiveReactions(sheetData));
    
    console.debug(sheetData);
    return sheetData;
  }
}

