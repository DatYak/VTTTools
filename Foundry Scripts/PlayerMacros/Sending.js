//https://www.reddit.com/r/FoundryVTT/comments/jpgywv/macro_help_text_input_prompting/
let target = scope.recipient ? scope.recipient : "The Void";
let dialogTitle = 'Send To: ' + target;

let whisper = game.users.filter(u => u.isGM).map(u => u._id);

new Dialog({
    title: dialogTitle,
    content:`
      <form>
        <div class='form-group'>
          <label>Message</label>
          <input type='text' name='message'></input>
        </div>
        <br>
        <div class='form-group'>
          <label>Private Message</label>
          <input type='checkbox' id='whisper' name='whisper' value='Whisper'></input>
        </div>
      </form>`,
    buttons:{
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Send`
      }},
    default:'yes',
    close: html => {
      let result = html.find('input[name=\'message\']');
      let valid = false;
      let isWhisper = html.find('input[name=\'whisper\']').val();
      if (result.val() != "")
      {
        let wordCount = (result.val().split(" ").length - 1);
        if (wordCount < 25)
              valid = true;
      }
      if (result.val()!== '') {
          let chatData = {
              user: game._id,
              speaker: ChatMessage.getSpeaker(),
              content: valid ? result.val() : 'This message is too much for the spell to handle: ' + result.val(),
              whisper: isWhisper ? whisper : ''
          };
          ChatMessage.create(chatData, {});
        }
      }
  }).render(true);