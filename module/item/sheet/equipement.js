export default class EquipementSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "equipement"],
      template: "systems/tylestel/templates/sheet/equipement.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing equipement data");
    console.debug(sheetData);

    return sheetData;
  }
}
