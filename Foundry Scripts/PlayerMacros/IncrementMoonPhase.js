const FLAG_SCOPE = "world"
const FLAG_KEY = "moonPhase";


// Register the setting if it hasn't been registered yet
if (!game.settings.settings.has(`${FLAG_SCOPE}.${FLAG_KEY}`)) {
    game.settings.register(FLAG_SCOPE, FLAG_KEY, {
        name: "moonPhase",
        hint: "Stores an int for use with moon phase abilities",
        scope: "world",
        config: false, // Not shown in settings UI
        type: Number,
        default: 1
    });
}


let moonPhase = game.settings.settings.get(FLAG_SCOPE, FLAG_KEY) || 1;

new Dialog({
    title: "Increment or set Moon Phase",
    content: `
        <p>Current Phase: <strong>${moonPhase}</strong></p>
        <p>Modify the value:</p>
        <input type="number" id="newValue" value="${moonPhase}"/>
        `,    
        
        buttons: {
        set: {
            label: "Set Value",
            callback: (html) => {
                let newValue = parseInt(html.find("#newValue").val());
                if (newValue > 32)
                    newValue = 32;
                if (newValue < 1)
                    newValue = 1;
                
                game.settings.set(FLAG_SCOPE, FLAG_KEY, newValue);
                ui.notifications.info(`Set world value to ${newValue}`);
            }
        },
        increment: {
            label: "+1",
            callback: () => {
                let newValue = moonPhase+1;
                if (newValue > 32)
                    newValue = 1;
                game.settings.set(FLAG_SCOPE, FLAG_KEY, newValue);
                ui.notifications.info(`Incremented world value to ${newValue}`);
            }
        },
        decrement: {
            label: "-1",
            callback: () => {
                let newValue = moonPhase-1;
                if (newValue < 1)
                    newValue = 32;
                game.settings.set(FLAG_SCOPE, FLAG_KEY, newValue);
                ui.notifications.info(`Decremented world value to ${newValue}`);
            }
        },
        reset: {
            label: "Reset",
            callback: () => {
                game.settings.set(FLAG_SCOPE, FLAG_KEY, 0);
                ui.notifications.info("World value reset to 0");
            }
        }
    },
    default:"+1"
}).render(true);