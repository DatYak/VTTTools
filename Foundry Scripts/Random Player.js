const tableRoll = (await game.tables.entities.find(t => t.name === "Random Player Character").roll()).results[0];

var playerLink = tableRoll.data.data.name;

var output = "<b>The player selected is: " + playerLink + "<b>";

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: output,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
    };

ChatMessage.create(chatData);