const FLAG_SCOPE = "world";
const FLAG_KEY = "moonPhase";

let tableName = "Moon Phases";

let index = game.settings.settings.get(FLAG_SCOPE, FLAG_KEY) || 1;

index = Math.round(index / 4);
 
let table = game.tables.getName(tableName);
if (!table){ 
    ui.notifications.warn(`Table "${tableName}" not found.`);
    return;
}

let results = table.results.contents;

if (index < 0 || index >= results.length) {
    ui.notifications.warn("Index out of bounds.");
    return;
}

let result = results[index];

let chatData = {
    user: game.user.id,
    content: result.text,
    whisper: game.user.id
};
ChatMessage.create(chatData);