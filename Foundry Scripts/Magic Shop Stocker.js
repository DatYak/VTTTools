let  itemTier = 0;

const commonTable = (await game.tables.entities.find(t => t.name === "Common Magic Items"));
const uncommonTable = (await game.tables.entities.find(t => t.name === "Uncommon Magic Items"));
const rareTable = (await game.tables.entities.find(t => t.name === "Rare Magic Items"));
const veryrareTable = (await game.tables.entities.find(t => t.name === "Very Rare Magic Items"));

let d = new Dialog({
    title: "Magic Shop Size",
    content: "What is the rarest item they own",
    buttons: {
        one: {
            label: "Common",
            callback: () => itemTier = 0
        },
        two: {
            label: "Uncommon",
            callback: () => itemTier = 1
        },
        three: {
            label: "Rare",
            callback: () => itemTier = 2
        },
        four: {
            label: "Very Rare",
            callback: () => itemTier = 3
        },
    },
    close: html => displayCost()
}).render(true)


async function displayCost () {
    
    let output = "<b> Inventory </b> <p>";

    const commonitems = [];
    const uncommonitems = [];
    const rareitems = [];
    const veryrareitems = [];

    if (itemTier == 0)
    {
        let r = new Roll("1d4+1")
        r.evaluate()
        for (let index = 0; index < r.total; index++) {
            commonitems[index] = (await commonTable.roll()).results[0].data.text;
        }
    }
    else if (itemTier == 1)
    {
        let r = new Roll("1d4+1")
        r.evaluate()
        for (let index = 0; index < r.total; index++) {
            uncommonitems[index] = (await uncommonTable.roll()).results[0].data.text;
        }
        let r2 = new Roll("2d4")
        r2.evaluate()
        for (let index = 0; index < r2.total; index++) {
            commonitems[index] = (await commonTable.roll()).results[0].data.text;
        }
    }
    else if (itemTier == 2)
    {
        let r = new Roll("1d4+1")
        r.evaluate()
        for (let index = 0; index < r.total; index++) {
            rareitems[index] = (await rareTable.roll()).results[0].data.text;
        }
        let r2 = new Roll("2d4")
        r2.evaluate()
        for (let index = 0; index < r2.total; index++) {
            uncommonitems[index] = (await uncommonTable.roll()).results[0].data.text;
        }
        let r3 = new Roll("2d4")
        r3.evaluate()
        for (let index = 0; index < r3.total; index++) {
            commonitems[index] = (await commonTable.roll()).results[0].data.text;
        }
    }
    else if (itemTier == 3)
    {
        let r = new Roll("1d4+1")
        r.evaluate()
        for (let index = 0; index < r.total; index++) {
            veryrareitems[index] = (await veryrareTable.roll()).results[0].data.text;
        }
        let r2 = new Roll("2d4")
        r2.evaluate()
        for (let index = 0; index < r2.total; index++) {
            rareitems[index] = (await rareTable.roll()).results[0].data.text;
        }
        let r3 = new Roll("2d4")
        r3.evaluate()
        for (let index = 0; index < r3.total; index++) {
            uncommonitems[index] = (await uncommonTable.roll()).results[0].data.text;
        }
        let r4 = new Roll("2d4")
        r4.evaluate()
        for (let index = 0; index < r4.total; index++) {
            commonitems[index] = (await commonTable.roll()).results[0].data.text;
        }
    }

    if (commonitems.length > 0) {
        output += "<b>Commons: </b><p>";
        let cost = 0;
        for (let index = 0; index < commonitems.length; index++) {
            let r = new Roll("1d6")
            r.evaluate()
            cost = (r.total + 2) * 10;
            output += commonitems[index] + " for " + cost + " gold<p>";
        }
    }
    if (uncommonitems.length > 0) {
        output += "<b>Uncommons: </b><p>";
        let cost = 0;
        for (let index = 0; index < uncommonitems.length; index++) {
            let r = new Roll("1d6")
            r.evaluate()
            cost = (r.total + 1) * 100;
            output += uncommonitems[index] + " for " + cost + " gold<p>";
        }
    }
    if (rareitems.length > 0) {
        output += "<b>Rares: </b><p>";
        let cost = 0;
        for (let index = 0; index < rareitems.length; index++) {
            let r = new Roll("2d10")
            r.evaluate()
            cost = (r.total + 1) * 1000;
            output += rareitems[index] + " for " + cost + " gold<p>";
        }
    }
    if (veryrareitems.length > 0) {
        output += "<b>Very Rares: </b><p>";
        let cost = 0;
        for (let index = 0; index < veryrareitems.length; index++) {
            let r = new Roll("1d4")
            r.evaluate()
            cost = (r.total + 1) * 10000;
            output += veryrareitems[index] + " for " + cost + " gold<p>";
        }
    }

    let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: output,
        whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };
    
    ChatMessage.create(chatData);
} 

