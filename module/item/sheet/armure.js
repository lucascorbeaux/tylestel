export default class ArmureSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "armure"],
      template: "systems/tylestel/templates/sheet/armure.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing armure data");
    console.debug(sheetData);

    return sheetData;
  }
}
