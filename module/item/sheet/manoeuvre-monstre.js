export default class ManoeuvreMonstreSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "manoeuvre"],
      template: "systems/tylestel/templates/sheet/manoeuvre-monstre.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing manoeuvre monstre data");
    console.debug(sheetData);

    sheetData.attributsMonstre = {corps: "Corps", tete: "Tête"};

    return sheetData;
  }
}
