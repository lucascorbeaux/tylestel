import { declareManoeuvre } from "./manoeuvre.js";
import { declareManoeuvreList } from "./manoeuvre-list.js";
import { declareCompteurVie } from "./vie.js";
import { declarePopover } from "./popover.js";
import { declareHerosToolbar } from './heros-toolbar.js';
import { declarePouvoirList } from "./pouvoir-list.js";
import { declareArmeList } from "./items/arme-list.js";
import { declareArmureList } from "./items/armure-list.js";

export function declareComponent() {
  declarePopover();
  declareCompteurVie();
  declareManoeuvre();
  declareManoeuvreList();
  declareHerosToolbar();
  declarePouvoirList();
  declareArmeList();
  declareArmureList();
}
