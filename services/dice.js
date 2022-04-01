const magies = [
  "kardia de la terre",
  "kardia du feu",
  "kardia de l'eau",
  "kardian de la terre",
];

const attributs = [
  "force",
  "agilité",
  "endurance",
  "volonté",
  "perception",
  "charisme"
];

const metiers = [
  "artisan",
  "artiste",
  "athlète",
  "balistikos",
  "dresseur",
  "flux",
  "kardia de la terre",
  "kardia du feu",
  "kardia de l'eau",
  "kardia du vent",
  "guerrier",
  "kleptos",
  "marin",
  "pharmaka",
  "prêtre",
  "rhéteur",
  "savant",
  "stratégos",
  "survie"
];

export async function executeManoeuvresMonstres(actorId, manoeuvres) {
  const actor = game.actors.get(actorId);

  manoeuvres.forEach((manoeuvre) => {
    const name = manoeuvre.name;
    const description = manoeuvre.data.description;

    ChatMessage.create(
      {
        content: description,
        speaker: ChatMessage.getSpeaker({ actor }),
        flavor: name,
      },
      {}
    );

    if (manoeuvre.data.nbUtilisationsMax != -1) {
      const item = actor.items.get(manoeuvre._id);
      item.update({
        data: { nbUtilisationsActuel: manoeuvre.data.nbUtilisationsActuel + 1 },
      });
    }
  });
}

export async function executeManoeuvres(actorId, manoeuvres) {
  const actor = game.actors.get(actorId);

  const attribut = await determinerAttribut(manoeuvres);
  const metier = await determinerMetier(manoeuvres, actor);

  if((!attribut || !metier) && manoeuvres[0].data.attribut) {
    ui.notifications.error(`Les manoeuvres sont incompatibles.`);
    return;
  }

  manoeuvres.forEach((manoeuvre) => {
    const name = manoeuvre.name;
    const description = manoeuvre.data.description;

    ChatMessage.create(
      {
        content: description,
        speaker: ChatMessage.getSpeaker({ actor }),
        flavor: name
      },
      {}
    );

    if(manoeuvre.data.nbUtilisationsMax != -1) {
      const item = actor.items.get(manoeuvre._id);
      item.update({
        data: { nbUtilisationsActuel: manoeuvre.data.nbUtilisationsActuel + 1 },
      });
    }
  });

  if(!!attribut && !!metier) {
    await launchDice(actorId, attribut, metier);
  }
}

export async function launchDice(actorId, attribut, metier) {
  const actor = game.actors.get(actorId);

  const actorData = actor.data.data;
  const attributValue = actorData.attributs[attribut];
  const metierValue = actorData.metiers[metier];

  const malusEtat = Object.values(actorData.etats).filter(e => e.actif).reduce((prev, curr) => prev + curr.malus, 0);

  const rollFormula = `1d6x+1d6+${attributValue}+${metierValue}-${malusEtat}`;
  const roll = new Roll(rollFormula, actorData);
  const rollEvaluation = await roll.evaluate({async: true});
  return rollEvaluation.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${attribut} + ${metier}`,
  });
}


export async function determinerAttribut(manoeuvres) {
  const attributsPossibleParManoeuvre = manoeuvres.map((m) => m.data.attribut === 'variable' ? attributs : m.data.attribut.split("/"));
  const attributsPossible = attributsPossibleParManoeuvre.reduce(
    (prev, current) => {
      if (prev === null) {
        return current;
      }

      return intersect(prev, current);
    },
    null
  );

  if(!attributsPossible.length) {
    return null;
  }

  if(attributsPossible.length === 1) {
    return attributsPossible[0];
  }

  // Modale pour demander l'attributs
  return openDialogChoix('Choix de l\'attribut', {possible: attributsPossible, fieldName: 'Attribut'});
}

export async function determinerMetier(manoeuvres, actor) {
  const metiersPossibleParManoeuvre = manoeuvres.map((m) =>
    m.data.metier === "variable" ? metiers : m.data.metier.split("/")
  );
  const metiersPossibles = metiersPossibleParManoeuvre.reduce(
    (prev, current) => {
      if (prev === null) {
        return current;
      }

      return intersect(prev, current);
    },
    null
  );

  if (!metiersPossibles.length) {
    return null;
  }

  let metier = metiersPossibles[0];

  if (metiersPossibles.length > 1) {
    metier = await openDialogChoix("Choix du metier", {
      possible: metiers,
      fieldName: "Magie",
    });
  }

  if (metier === "kardia") {
    metier = await openDialogMagie("Choix du metier", actor);
  }

  return metier;
}

export function intersect(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}

async function openDialogChoix(title, data) {
  const urlTemplate = `systems/tylestel/templates/dialog/choix-attribut.html`;
  const content = await renderTemplate(urlTemplate, data);
  
  return new Promise((resolve) => {
    new Dialog({
      title,
      content,
      buttons: {
        std: {
          label: "Valider",
          callback: (html) => {
            const dialogData = html[0].querySelector("form");
            resolve(dialogData.choix.value);
          },
        },
      },
      close: (html) => {
        resolve();
      },
    }).render(true);
  });
}

async function openDialogMagie(title, actor) {
  const urlTemplate = `systems/tylestel/templates/dialog/magie.html`;
  const content = await renderTemplate(urlTemplate);

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
              const magie = dialogData[0].value;
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
              resolve(metier);
            },
          },
        },
        close: (html) => {
          resolve();
        },
      },
      { height: 640, width: 800 }
    ).render(true);
  });
}