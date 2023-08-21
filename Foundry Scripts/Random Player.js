const tableRoll = (await game.tables.find(t => t.name === "Random Player Character").roll()).results[0];

var playerLink = tableRoll.text;

var output = "<b>The player selected is: " + playerLink + "<b>";

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: output,
    whisper: game.user._id
    };

ChatMessage.create(chatData);