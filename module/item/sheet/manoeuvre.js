import { attributs, metiers } from "../../data.js";

export default class ManoeuvreSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "manoeuvre"],
      template: "systems/tylestel/templates/sheet/manoeuvre.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing manoeuvre data");
    console.debug(sheetData);

    sheetData.metiers = metiers;
    sheetData.attributs = attributs;

    return sheetData;
  }
}
