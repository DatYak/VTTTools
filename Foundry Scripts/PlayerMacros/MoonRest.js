const FLAG_SCOPE = "world";
const FLAG_KEY = "moonPhase";

console.log("Restoring Charges")

if (game.settings.settings.has(`${FLAG_SCOPE}.${FLAG_KEY}`)) {


    let characterName = "Party"
    let itemName = "Moonstone Spurs"

    let actor = game.actors.find(a => a.name === characterName);

    if (!actor) {
        ui.notifications.warn(`Character "${characterName}" not found.`);
        return;
    }

    // Find the item in the character's inventory
    let item = actor.items.find(i => i.name === itemName);
    if (!item) {
        ui.notifications.warn(`Item "${itemName}" not found on ${characterName}.`);
        return;
    }    

    console.log("Restoring Charges");

    let moonPhase = game.settings.get(FLAG_SCOPE, FLAG_KEY) || 1;

    let chargesToAdd = Math.round(moonPhase / 4)

    let newCharges = item.system.uses.value + chargesToAdd;

    if (newCharges > item.system.uses.max)
    {
        newCharges = item.system.uses.max;
    }

    item.update({"system.uses.value": newCharges});

    console.log(moonPhase)
}