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
      width: 1060,
      height: 760,
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

    const race = getItems(sheetData, "race")[0];
    sheetData.race = race ? encodeToLitObject(race) : '';
    sheetData.raceName = race?.name;

    sheetData.nbActions = Math.floor(sheetData.data.data.metiers.guerrier / 2) + 2;
    sheetData.nbReactions = Math.floor(sheetData.data.data.metiers.stratégos / 2) + 1;
    
    console.debug(sheetData);
    return sheetData;
  }

  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;

    const item = await Item.fromDropData(data);
    
    if(item.type === 'race') {
      const currentRace = this.actor.items.filter((item) => item.type === "race")[0];
      if(currentRace) {
        await this.actor.deleteEmbeddedDocuments("Item", [currentRace._id]);
        await this.actor.createEmbeddedDocuments("Item", [item.toObject(false)])
        return;
      }
    }

    super._onDropItem(event, data);

  }
}

