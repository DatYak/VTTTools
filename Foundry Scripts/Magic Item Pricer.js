let goldTier = 0;

let d = new Dialog({
    title: "Item Rarity",
    content: "Select Rarity",
    buttons: {
        one: {
            label: "Common",
            callback: () => goldTier = 0
        },
        two: {
            label: "Uncommon",
            callback: () => goldTier = 1
        },
        three: {
            label: "Rare",
            callback: () => goldTier = 2
        },
        four: {
            label: "Very Rare",
            callback: () => goldTier = 3
        },
        five: {
            label: "Legendary",
            callback: () => goldTier = 4
        },
    },
    close: html => displayCost()
}).render(true)


function displayCost () {
    
    let output = " ";

    let cost = 0;

    let discountPercent = 20;

    if (goldTier == 0)
    {
        let r = new Roll("1d6")
        r.evaluate({async: false})
        cost = (r.total + 1) * 10;
    }
    else if (goldTier == 1)
    {
        let r = new Roll("1d6")
        r.evaluate({async: false})
        cost = r.total * 100;
    }
    else if (goldTier == 2)
    {
        let r = new Roll("2d10")
        r.evaluate({async: false})
        cost = r.total * 1000;
    }
    else if (goldTier == 3)
    {
        let r = new Roll("1d4")
        r.evaluate({async: false})
        cost = (r.total +1) * 10000;
    }
    else if (goldTier == 4)
    {
        let r = new Roll("2d6")
        r.evaluate({async: false})
        cost = r.total * 25000;
    }

    let discountedCost = cost - (cost * (discountPercent/100));

    output = "<b>Default Price: <b>" + cost + " gold<p>" + "<b>Lowest Price: <b>" + discountedCost;

    let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: output,
        whisper: game.user._id
        };
    
    ChatMessage.create(chatData);
} 

