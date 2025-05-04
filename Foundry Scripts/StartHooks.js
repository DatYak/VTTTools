Hooks.once("ready", () => {
    if (game.user.isGM) {
        let onDayChanged = game.macros.find(m => m.name === "OnDayChanged")
        if(onDayChanged){
            onDayChanged.execute();
        }
    }
});