export default class ArmeSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "arme"],
      template: "systems/tylestel/templates/sheet/arme.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing arme data");
    console.debug(sheetData);

    return sheetData;
  }
}
