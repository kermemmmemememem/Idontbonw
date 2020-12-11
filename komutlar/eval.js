const Discord = require("discord.js");
const db = require("quick.db")
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
  if (message.author.id !== ayarlar.sahip)
    return message.channel.send('__**Bu Komut Sadece**__ `YAPIMCIYA`__** Özeldir!** __');

  if (args[0] === "ayarlar.isotoken")
    return message.channel.sendMessage("```Kusura bakma ama tokenimi alamazsın :D```");
  try {
    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled));
  } catch (err) {
    message.channel.sendMessage(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "eval",
  description: "Kod denemek için kullanılır.",
  usage: "eval [kod]"
};