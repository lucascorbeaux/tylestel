export function executeManoeuvres(actorId, manoeuvres) {
  const actor = game.actors.get(actorId);
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

    const item = actor.items.get(manoeuvre._id);
    item.update({
      data: { nbUtilisationsActuel: manoeuvre.data.nbUtilisationsActuel + 1 },
    });
  });

  const firstManoeuvre = manoeuvres[0];
  launchDice(actorId, firstManoeuvre.data.attribut, firstManoeuvre.data.metier);
}

export function launchDice(actorId, attribut, metier) {
  const actor = game.actors.get(actorId);

  const actorData = actor.data.data;
  const attributValue = actorData.attributs[attribut];
  const metierValue = actorData.metiers[metier];

  const rollFormula = `1d6x+1d6+${attributValue}+${metierValue}`;
  const roll = new Roll(rollFormula, actorData);
  roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `Attribut + Metier`,
  });
}