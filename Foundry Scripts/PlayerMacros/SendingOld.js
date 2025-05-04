//https://www.reddit.com/r/FoundryVTT/comments/jpgywv/macro_help_text_input_prompting/
let target = arguments[0].args[0]
let dialogTitle = 'Send To: ' + target

let whisper = game.users.filter(u => u.isGM).map(u => u.data._id);

new Dialog({
    title: dialogTitle,
    content:`
      <form>
        <div class="form-group">
          <label>Input text</label>
          <input type='text' name='inputField'></input>
        </div>
      </form>`,
    buttons:{
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Send`
      }},
    default:'yes',
    close: html => {
      let result = html.find('input[name=\'inputField\']');
      let wordCount = (result.val().split(" ").length - 1);
      let valid = true;
      if (wordCount > 25)
            valid = false;
      if (result.val()!== '') {
          let chatData = {
              user: game.user._id,
              speaker: ChatMessage.getSpeaker(),
              content: valid ? result.val() : 'Message: ' + result.val() + ' was too long for the spell',
              whisper: whisper
          };
          ChatMessage.create(chatData, {});
        }
      }
  }).render(true);