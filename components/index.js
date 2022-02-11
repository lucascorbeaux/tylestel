import { declareManoeuvre } from "./manoeuvre.js";
import { declareManoeuvreList } from "./manoeuvre-list.js";
import { declareCompteurVie } from "./vie.js";
import { declarePopover } from "./popover.js";

export function declareComponent() {
  declarePopover();
  declareCompteurVie();
  declareManoeuvre();
  declareManoeuvreList();
}
