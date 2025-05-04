    const title = "Take Long Rest?";
    const description = "A new day has begun...";
    const img = false;
    const autoclose = "";
    const buttonData = [{
        label: "Take rest",
        command:async function(){
            let macro = game.macros.getName("Take Long Rest");
            if (macro) macro.execute();
        },
        scope: {LIMIT: "ONCE"}
    }]


    await Requestor.request({
        title: title,
        description: description,
        buttonData: buttonData,
        autoclose: autoclose,
        img: img
    })