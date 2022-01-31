import ActorTylestel from "./actor/actor.js";
import HeroSheet from "./actor/sheet/hero.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once("init", function () {
  console.log(`Tylestel | Initializing Tylestel System`);
  game.tylestel = {
    ActorTylestel,
  };

  CONFIG.Actor.documentClass = ActorTylestel;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tylestel", HeroSheet, {
    types: ["heros"],
    makeDefault: true,
  });

  return preloadHandlebarsTemplates();
});
