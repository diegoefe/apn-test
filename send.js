var apn = require('apn');
var fs = require('fs-extra');

fs.readFile('./local-settings.json', { encoding:'utf8'}).then((data) => {
  const settings = JSON.parse(data);
  
  const options = {
    token: {
      key: settings.key,
      keyId: settings.keyId,
      teamId: settings.teamId
    },
    production: true
  };
  
  var apnProvider = new apn.Provider(options);
  
  let deviceToken = settings.tokens[0];
  
  var note = new apn.Notification();
  
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 Otro mensaje de notificacion manual para Ivan a las "+new Date();
  note.payload = {'messageFrom': 'Diego Efe'};
  note.topic = settings.topic;
  return apnProvider.send(note, deviceToken);
}).then( (result) => {
  // see documentation for an explanation of result
  console.log("result", result);
  process.exit(0);
}).catch((err) => {
  console.log("error", err);
  process.exit(1);
});

