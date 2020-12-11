const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let aktif = db.has(`lang_${message.guild.id}`) === false;


let müzike = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
.setTitle("Yorum")
.addField(`Vote Me`, `[Tıkla](https://top.gg/bot/780799480484069376/vote)`)
.addField(`Add Me `, `[Tıkla](https://discord.com/oauth2/authorize?client_id=780799480484069376&scope=bot&permissions=8)`)
    .setColor("RANDOM")
    .setAuthor(`Yorum`, client.user.avatarURL)
    .setDescription(
      "**Music Commands** \n ``play`` ``pause`` ``continue`` ``loop`` ``skip`` ``stop`` ``volume`` \n \n **Settings** \n ``prefix`` ``language`` \n\n **Entertainment Commands** \n ``comment`` \n\n **Bot Commands** \n ``statistics``"
    )
   
.setURL("https://discord.com/oauth2/authorize?client_id=780799480484069376&scope=bot&permissions=8")
.setImage("https://cdn.discordapp.com/attachments/777461715968720937/785140639737184306/yorumyoq.png")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/777461715968720937/786520768787513364/b32356d93573bc9e737046d6fbf6d6b7.webp"
 
    );

if (!aktif) message.channel.send(müzike);
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};
exports.help = {
  name: "help"
};
