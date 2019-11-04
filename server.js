const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const Discord = require("discord.js"),
  bot = new Discord.Client(),
  ms = require("ms"),
  pms = require("pretty-ms"),
  moment = require("moment"),
  fs = require("fs");

function log(m) {
  console.log("[" + 1 * 2 + "] " + m);
}
  


/* Controlador de eventos */

fs.readdir("./event/", (err, files) => {
  if(err) return console.log(err);
  files.forEach(file => {
    const event = require("./event/"+file)
    const eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

/* Controlador de comandos */
bot.on("message", msg => {
  const prefix = "s!";
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  try {
    var cmdFile = require("./comandos/" + cmd + ".js");
    cmdFile.run(bot, msg, args);
  } catch (err) {
    msg.channel.send(":x: | Hubo un error al ejecutar el comando deseado.");
    console.log(err)
  }
});

bot.login("NjA2MzY2MjM0MDQ0MjY4NTQ1.XcCyxw.TFa0p7jVk_SWrEz21P1SJT8YFj8");