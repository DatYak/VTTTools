let moonsData = SimpleCalendar.api.getAllMoons();
let phaseName = moonsData[0].currentPhase.name;

let characterName = "Apogee The Waning"
let itemName = "Moonstone Spurs"

let actor = game.actors.find(a => a.name === characterName);

if (!actor) {
    ui.notifications.warn(`Character "${characterName}" not found.`);
    return;
}

// Find the item in the character's inventory
let item = actor.items.find(i => i.name === itemName);
if (!item) {
    return;
}    

let chargesToRestore = 0 
for (let i = 0; i < moonsData[0].phases.Length; i ++)
{
    if (moonsData[i].phase.name === phaseName)
    {
        let phase = i+1;
        //8 phases, Full Moon is at 5
        let distanceFromFull = Math.abs(phase - 5);

        chargesToRestore = 4 - distanceFromFull;

        break;
    }
}


item.update({"system.uses.value": newCharges});