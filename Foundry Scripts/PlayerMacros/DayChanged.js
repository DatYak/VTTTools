Hooks.on(SimpleCalendar.Hooks.DateTimeChange, (data) => {

    if (data.diff === 86400)
    {
        let spursRestore = game.macros.find(m => m.name === "RestoreMoonSpurs")
        if(spursRestore){
            spursRestore.execute();
        }

        let restMacro= game.macros.find(m => m.name === "PromptLRest")
        if (restMacro){
            restMacro.execute();
        }
    }

 });