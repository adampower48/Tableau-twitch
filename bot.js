const tmi = require('tmi.js');
const util = require("util");
const fs = require("fs");
const fastcsv = require("fast-csv");


var channel;
if (process.argv.length < 2){
    // default channel
    channel = "Quin69";
} else {
    channel = process.argv[2];
}

// Read twitch credentials
let rawdata = fs.readFileSync('twitch_credentials.json');
let creds = JSON.parse(rawdata);  


// Define configuration options
const opts = {
  identity: {
    username: creds["username"],
    password: creds["password"]
  },
  channels: [
    channel
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  
  // console.log(context);
  
  // Open output file
  var chat_messages = fs.createWriteStream(util.format("chat_messages_%s.csv", channel), {flags: "a", encoding:"utf8"});
  
  fastcsv.write([[context["tmi-sent-ts"], context["username"], msg]], {escape:"\\", includeEndRowDelimiter:true}).pipe(chat_messages);
  
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(util.format("* Connected to %s:%s", addr, port));
}