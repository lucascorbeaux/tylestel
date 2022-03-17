import ActorTylestel from "./actor/actor.js";
import ItemTylestel from "./item/item.js";
import HeroSheet from "./actor/sheet/hero.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import PouvoirSheet from "./item/sheet/pouvoir.js";
import ManoeuvreSheet from "./item/sheet/manoeuvre.js";
import ArmeSheet from "./item/sheet/arme.js";
import ArmureSheet from "./item/sheet/armure.js";
import MonstreSheet from "./actor/sheet/monstre.js";
import ManoeuvreMonstreSheet from "./item/sheet/manoeuvre-monstre.js";
import EquipementSheet from "./item/sheet/equipement.js";
import FamilierSheet from "./item/sheet/familier.js";
import { declareComponent } from "../components/index.js";
import { Macro } from "./macro.js";

Hooks.once("init", function () {
  console.log(`Tylestel | Initializing Tylestel System`);
  game.tylestel = {
    ActorTylestel,
    ItemTylestel,
    macros: Macro
  };

  CONFIG.Actor.documentClass = ActorTylestel;
  CONFIG.Item.documentClass = ItemTylestel;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tylestel", HeroSheet, {
    types: ["heros"],
    makeDefault: true,
  });
  Actors.registerSheet("tylestel", MonstreSheet, {
    types: ["monstres"],
    makeDefault: true,
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tylestel", PouvoirSheet, {
    types: ["pouvoir"],
    makeDefault: true,
  });
  Items.registerSheet("tylestel", ArmeSheet, {
    types: ["arme"],
    makeDefault: true,
  });
  Items.registerSheet("tylestel", ArmureSheet, {
    types: ["armure"],
    makeDefault: true,
  });
  Items.registerSheet("tylestel", EquipementSheet, {
    types: ["equipement", "race"],
    makeDefault: true,
  });
  ;
  Items.registerSheet("tylestel", ManoeuvreSheet, {
    types: ["actions", "reactions"],
    makeDefault: true,
  });
  Items.registerSheet("tylestel", ManoeuvreMonstreSheet, {
    types: ["actions", "reactions"]
  });
  Items.registerSheet("tylestel", FamilierSheet, {
    types: ["familier"]
  });

  Handlebars.registerHelper("contains", function (needle, haystack, options) {
    needle = Handlebars.escapeExpression(needle);
    haystack = Handlebars.escapeExpression(haystack);
    return haystack.indexOf(needle) > -1
      ? options.fn(this)
      : options.inverse(this);
  });

  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  declareComponent();
  return preloadHandlebarsTemplates();
});


Hooks.on("preCreateItem", function (document, options, userId) {
  document.data.update({
    img: "systems/tylestel/assets/icons/" + document.data.type + ".png",
  });
});

Hooks.on("preCreateActor", function (entity, options, userId) {
  entity.data.update({
    img: "systems/tylestel/assets/icons/" + entity.type + ".png",
  })

  if (entity.name == "") {
    entity.data.update({
      name: "Nouveau " + entity.type[0].toUpperCase() + entity.type.slice(1),
    })
  }
});
