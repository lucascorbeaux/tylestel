import { dieux } from "../../data.js";
import {
  encodeToLitObject,
  getActions,
  getActiveActions,
  getActiveReactions,
  getPouvoir,
  getReactions,
  getItems
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
    sheetData.armes = encodeToLitObject(getItems(sheetData, 'arme'));
    sheetData.armures = encodeToLitObject(getItems(sheetData, "armure"));
    sheetData.equipements = encodeToLitObject(getItems(sheetData, "equipement"));
    sheetData.familiers = encodeToLitObject(getItems(sheetData, "familier"));

    sheetData.nbActions = sheetData.data.data.metiers.guerrier / 2 + 2;
    sheetData.nbReactions = sheetData.data.data.metiers.stratégos / 2 + 1;
    
    console.debug(sheetData);
    return sheetData;
  }
}

