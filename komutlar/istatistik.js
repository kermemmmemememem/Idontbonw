const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');


exports.run = (client, message) => {
  const db = require("quick.db");
 let aktif = db.has(`lang_${message.guild.id}`) === true;
    const duration = moment.duration(client.uptime).format(" D [Gün], H [saat], m [dakika], s [saniye]");
    const istatisdtikozel = new Discord.RichEmbed()
    .setColor("#99a3ec")
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .addField(` Bot Sahibi`, `! ✮𝕂𝕖𝕣𝕖𝕞◕#1019`, ) 
    .addField(`Bot Geliştiricisi`, `★『AZE』ꐟ Møøn#0001`, )
.addField(`Bot Geliştiricisi`, `! Ayıcık ꐟ ✧ ◕#3189`, )
    .addField("Bellek Kullanımı ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField(" Sunucular", `${client.guilds.size.toLocaleString()}`, true)
  .addField(" Toplam Kullanıcı ", `${client.users.size}`, true)
    .addField("Online Kullanıcı", `${client.users.filter(users => users.presence.status == "online").size}`, true)
     .addField("Offline Kullanıcı", `${client.users.filter(users => users.presence.status == "offline").size}`, true)
  .addField(` Aktif Zaman `, `${duration}`, true) 
        .addField(`Bana Oy Ver`, `[Tıkla](https://top.gg/bot/780799480484069376/vote)`, true)
  .addField(`Beni Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=780799480484069376&scope=bot&permissions=8)`, true)
 if (!aktif) message.channel.send(istatisdtikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};