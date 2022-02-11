export default class PouvoirSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "pouvoir"],
      template: "systems/tylestel/templates/sheet/pouvoir.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing pouvoir data");
    console.debug(sheetData);

    return sheetData;
  }
}
