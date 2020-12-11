const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');


exports.run = (client, message) => {
  const db = require("quick.db");
 let aktif = db.has(`lang_${message.guild.id}`) === false;
    const duration = moment.duration(client.uptime).format(" D [day], H [hour], m [minute], s [second]");
    const istatistikozel = new Discord.RichEmbed()
.setColor("#99a3ec")
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .addField(` Bot Owner`, `! ✮𝕂𝕖𝕣𝕖𝕞◕#1019`, )
    .addField(` Bot Developer`, `★『AZE』ꐟ Møøn#0001`, )
.addField(`Bot Developer`, `! Ayıcık ꐟ ✧ ◕#3189`, )
    .addField(" Memory Usage ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField(" Number of Servers", `${client.guilds.size.toLocaleString()}`, true)
  .addField("Total number of users ", `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField(` Active Time  `, `${duration}`, true)
  .addField(" Discord.js Version ", `${Discord.version}`, true) 
.addField(`Vote Me`, `[Click](https://top.gg/bot/780799480484069376/vote)`, true)
  .addField(` Invite Me`, `[Click](https://discord.com/oauth2/authorize?client_id=780799480484069376&scope=bot&permissions=8)`, true)
 if (!aktif) message.channel.send(istatistikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stats'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'statistics',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};