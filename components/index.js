import { declareManoeuvre } from "./manoeuvre.js";
import { declareManoeuvreList } from "./manoeuvre-list.js";
import { declareCompteurVie } from "./vie.js";
import { declarePopover } from "./popover.js";
import { declareHerosToolbar } from './heros-toolbar.js';
import { declarePouvoirList } from "./pouvoir-list.js";
import { declareArmeList } from "./items/arme-list.js";
import { declareArmureList } from "./items/armure-list.js";
import { declareManoeuvreMonstre } from "./manoeuvre-monstre.js";
import { declareCapaciteRaciale } from "./capa-raciale.js";
import { declareCompositionSort } from './magie/composition-sort.js';
import { declareTermeChoix } from './magie/terme-choix.js';
import { declareFamilierList } from "./items/familier-list.js";

export function declareComponent() {
  declarePopover();
  declareCompteurVie();
  declareManoeuvre();
  declareManoeuvreList();
  declareHerosToolbar();
  declarePouvoirList();
  declareArmeList();
  declareArmureList();
  declareManoeuvreMonstre();
  declareCapaciteRaciale();
  declareTermeChoix();
  declareCompositionSort();
  declareFamilierList();
}
