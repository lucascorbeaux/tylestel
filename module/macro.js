import { metiers, attributs } from "./data.js";
import { launchDice } from "../services/dice.js";

export class Macro {
  /**
   * Encaisser des dommages sur l'acteur courant
   */
  static takeDamage = function (actor) {
    openDialog("Encaisser des dommages", "number-dialog", actor, (data) => {
      const nbDommage = data.numField.value;
      if (!nbDommage || nbDommage <= 0) {
        ui.notifications.error(`Le nombre de dommage doit être positif`);
        return;
      }

      const valeurArmure = actor.data.data.valeurArmure;

      if (valeurArmure >= nbDommage) {
        ui.notifications.succes("Votre armure encaisse tous les dommages");
        return;
      }

      const currentVieRessource = actor.data.data.vie;

      updateActorData(actor, "vie", {
        ...currentVieRessource,
        current: currentVieRessource.current - Number(nbDommage) + valeurArmure,
      });
    });
  };

  /**
   * Regagner de la vie
   */
  static regainLife = function (actor) {
    openDialog("Regagner de la vie", "number-dialog", actor, (data) => {
      const nbVie = data.numField.value;
      if (!nbVie || nbVie <= 0) {
        ui.notifications.error(`Le nombre de pts regagné doit être positif`);
      }
      const currentVieRessource = actor.data.data.vie;

      updateActorData(actor, "vie", {
        ...currentVieRessource,
        current: currentVieRessource.current + Number(nbVie),
      });
    });
  };

  static makeTest = function (actor) {
    openDialog("Effectuer une action", "choix-test", actor, (data) => {
      const attribut = data.attribut.value;
      const metier = data.metier.value;
      launchDice(actor.data._id, attribut, metier);
    });
  };

  static makeMagic = function (actor) {
    openDialog("Lancer un sort", "magie", actor, (data) => {
      const magie = data[0].value;
      const attribut = "volonté";
      const metier = magie.kardia;
      const descriptif = magie.descriptif;
      ChatMessage.create(
        {
          content: descriptif,
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: name,
        },
        {}
      );
      launchDice(actor.data._id, attribut, metier);
    }, { height: 640, width: 800});
  };

  static getSpeakersActor = function () {
    // Vérifie qu'un seul token est sélectionné
    const tokens = canvas.tokens.controlled;
    if (tokens.length > 1) {
      ui.notifications.warn("Vous avez sélectionné plusieurs tokens");
      return null;
    }

    const speaker = ChatMessage.getSpeaker();
    let actor;
    // Si un token est sélectionné, le prendre comme acteur cible
    if (speaker.token) actor = game.actors.tokens[speaker.token];
    // Sinon prendre l'acteur par défaut pour l'utilisateur courrant
    if (!actor) actor = game.actors.get(speaker.actor);
    return actor;
  };
}


export async function openDialog(title, template, actor, callback, options) {
  const urlTemplate = `systems/tylestel/templates/dialog/${template}.html`;
  const content = await renderTemplate(urlTemplate, { actor });

  return new Promise((resolve) => {
    new Dialog(
      {
        title,
        content,
        buttons: {
          std: {
            label: "Valider",
            callback: (html) => {
              const dialogData = html[0].querySelector("form");
              callback(dialogData);
            },
          },
        },
        close: (html) => {
          resolve();
        },
      },
      options
    ).render(true);
  });
}


export function updateActorData(actor, key, updatedProperties) {
  const data = { data: {} };
  data.data[key] = updatedProperties;
  actor.update(data);
}
