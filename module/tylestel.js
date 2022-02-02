import ActorTylestel from "./actor/actor.js";
import ItemTylestel from "./item/item.js";
import HeroSheet from "./actor/sheet/hero.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import PouvoirSheet from "./item/sheet/pouvoir.js";
import ManoeuvreSheet from "./item/sheet/manoeuvre.js";
import { declareComponent } from "../components/index.js";

Hooks.once("init", function () {
  console.log(`Tylestel | Initializing Tylestel System`);
  game.tylestel = {
    ActorTylestel,
    ItemTylestel
  };

  CONFIG.Actor.documentClass = ActorTylestel;
  CONFIG.Item.documentClass = ItemTylestel;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tylestel", HeroSheet, {
    types: ["heros"],
    makeDefault: true,
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tylestel", PouvoirSheet, {
    types: ["pouvoir"],
    makeDefault: true,
  });
  Items.registerSheet("tylestel", ManoeuvreSheet, {
    types: ["actions", "reactions"],
    makeDefault: true,
  });


  declareComponent();
  return preloadHandlebarsTemplates();
});
