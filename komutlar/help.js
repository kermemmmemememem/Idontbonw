const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let aktif = db.has(`lang_${message.guild.id}`) === true;


let müzike = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
.setTitle("Yorum")
    .setColor("#99a3ec")
    .setAuthor(`Yorum`, client.user.avatarURL)
.addField(`Bana Oy Ver`, `[Tıkla](https://top.gg/bot/780799480484069376/vote)`)
.addField(`Beni Ekle `, `[Tıkla](https://discord.com/oauth2/authorize?client_id=780799480484069376&scope=bot&permissions=8)`)
    .setDescription(
      "**Müzik Komutları** \n ``çal`` ``duraklat`` ``rastgele`` ``devam`` ``tekrar`` ``geç`` ``durdur`` ``ses`` \n \n **Ayarlanabilir Komutlar** \n ``prefix`` ``dil`` \n\n **Eğlence Komutları** \n ``yorum``\n\n ****Bot Komutları**** \n ``istatistik``"
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
  aliases: ["yardım"],
  permLevel: 0
};
exports.help = {
  name: "yardım"
};
