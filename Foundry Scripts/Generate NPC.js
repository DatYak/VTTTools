const mannerism = (await game.tables.getName("NPCMannerisms").roll()).results[0].data.text;
const phsyicalQuirk = (await game.tables.getName("NPCPhysicalQuirks").roll()).results[0].data.text;
const build = (await game.tables.getName("NPCBuilds").roll()).results[0].data.text;
const alignment = (await game.tables.getName("NPCAlignment").roll()).results[0].data.text;
const lastName = (await game.tables.getName("NPCLastNames").roll()).results[0].data.text;
const maleName = (await game.tables.getName("NPCMaleNames").roll()).results[0].data.text;
const femaleName = (await game.tables.getName("NPCFemaleNames").roll()).results[0].data.text;
const Race = (await game.tables.getName("NPCHumanoidRace").roll()).results[0].data.text;
const Occupation = (await game.tables.getName("NPCOccupation").roll()).results[0].data.text;

let isMale = false;

let d = new Dialog({
    title: "NPC Gender",
    content: "what gender is the NPC",
    buttons: {
        one: {
            label: "Male",
            callback: () => isMale = true
        },
        two: {
            label: "Female",
            callback: () => isMale = false
        },
        three: {
            label: "Random",
            callback: () => isMale = (Math.floor(Math.random() * 2) == 0) ? true : false
        }
    },
    close: html => displayNPC()
}).render(true)

function displayNPC () {

    var npcname = " ";

    if (isMale)
    {
        npcname = maleName;
    }
    else
    {
        npcname = femaleName;
    }
    
    var output = "<b>" + npcname + " " + lastName + "</b><p> The " + alignment + " " + Race + " " +  Occupation + "<p>Build: " + build + "<p>Mannerism: " + mannerism + "<p>Phsyical Quirk: " + phsyicalQuirk;

    let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: output,
        //whisper: game.users.entities.find(user => user.name==='Gamemaster')
        whisper: ChatMessage.getWhisperRecipients("Gamemaster")
        };
    
    ChatMessage.create(chatData);
} 