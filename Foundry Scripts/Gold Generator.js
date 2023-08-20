
let goldTier = 0;

let d = new Dialog({
    title: "Individual Treasure",
    content: "Select CR",
    buttons: {
        one: {
            label: "CR 0-4",
            callback: () => goldTier = 0
        },
        two: {
            label: "CR 5-10",
            callback: () => goldTier = 1
        },
        three: {
            label: "CR 11-16",
            callback: () => goldTier = 2
        },
        four: {
            label: "CR 17+",
            callback: () => goldTier = 3
        },
    },
    close: html => displayReward()
}).render(true)

function displayReward () {
    
    let output = " ";

    let bronze = 0;
    let silver = 0;
    let electrum = 0;
    let gold = 0;
    let platinum = 0;

    let value = new Roll("1d100");
    value.evaluate();
    let valueTier = value.total;

    if (goldTier == 0)
    {
        if (valueTier <= 30) {
            let r = new Roll("5d6")
            r.evaluate()
            bronze = r.total;
        }
        else if (valueTier <= 60) {
            let r = new Roll("4d6")
            r.evaluate()
            silver = r.total;
        }
        else if (valueTier <= 70) {
            let r = new Roll("3d6")
            r.evaluate()
            electrum = r.total;
        }
        else if (valueTier <= 95) {
            let r = new Roll("2d6")
            r.evaluate()
            gold = r.total;
        }
        else if (valueTier >= 96) {
            let r = new Roll("1d6")
            r.evaluate()
            platinum = r.total;
        }
    }
    else if (goldTier == 1) {
        if (valueTier <= 30) {
            let r1 = new Roll("4d6")
            r1.evaluate()
            bronze = r1.total * 100;

            let r2 = new Roll("1d6")
            r2.evaluate()
            electrum = r2.total * 5;
        }
        else if (valueTier <= 60) {
            let r1 = new Roll("6d6")
            r1.evaluate()
            silver = r1.total * 10;

            let r2 = new Roll("2d6")
            r2.evaluate()
            gold = r2.total * 10;
        }
        else if (valueTier <= 70) {
            let r1 = new Roll("3d6")
            r1.evaluate()
            electrum = r1.total * 5;

            let r2 = new Roll("2d6")
            r2.evaluate()
            gold = r2.total * 10;
        }
        else if (valueTier <= 95) {
            let r1 = new Roll("4d6")
            r1.evaluate()
            gold = r1.total * 10;
        }
        else if (valueTier >= 96) {
            let r1 = new Roll("2d6")
            r1.evaluate()
            gold = r1.total * 10;

            let r2 = new Roll("3d6")
            r2.evaluate()
            platinum = r2.total;
        }
    }
    else if (goldTier == 2) {
        if (valueTier <= 20) {
            let r1 = new Roll("4d6")
            r1.evaluate()
            silver = r1.total * 100;

            let r2 = new Roll("1d6")
            r2.evaluate()
            gold = r2.total * 100;
        }
        else if (valueTier <= 35) {
            let r1 = new Roll("1d6")
            r1.evaluate()
            electrum = r1.total * 50;

            let r2 = new Roll("1d6")
            r2.evaluate()
            gold = r2.total * 100;
        }
        else if (valueTier <= 75) {
            let r1 = new Roll("2d6")
            r1.evaluate()
            gold = r1.total * 100;

            let r2 = new Roll("1d6")
            r2.evaluate()
            platinum = r2.total * 10;
        }
        else if (valueTier >= 76) {
            let r1 = new Roll("2d6")
            r1.evaluate()
            gold = r1.total * 100;

            let r2 = new Roll("2d6")
            r2.evaluate()
            platinum = r2.total+10;
        }
    }
    else if (goldTier == 3) {
        if (valueTier <= 15) {
            let r1 = new Roll("2d6")
            r1.evaluate()
            electrum = r1.total * 1000;

            let r2 = new Roll("8d6")
            r2.evaluate()
            gold = r2.total * 100;
        }
        else if (valueTier <= 55) {
            let r1 = new Roll("1d6")
            r1.evaluate()
            gold = r1.total * 1000;

            let r2 = new Roll("1d6")
            r2.evaluate()
            platinum = r2.total * 100;
        }
        else if (valueTier >= 56) {
            let r1 = new Roll("1d6")
            r1.evaluate()
            gold = r1.total * 1000;

            let r2 = new Roll("2d6")
            r2.evaluate()
            platinum = r2.total+100;
        }
    }

    output = "<b>REWARD<b><p>" + bronze + " Bronze Motes<p>"+ silver + " Silver Guilders<p>"+ electrum + " Electrum States<p>"+ gold + " Golden Crowns<p>"+ platinum + " Platinum Boons<p>";

    let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: output,
        whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
        };
    
    ChatMessage.create(chatData);
} 