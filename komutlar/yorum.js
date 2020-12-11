
const Discord = require('discord.js');
const client = new Discord.Client();
//yorumda yorum yok öyle mi
const db = require("quick.db");
exports.run = (client, message) => {
    let aktif = db.has(`lang_${message.guild.id}`) === true;
   if (!aktif)  message.channel.send('Bekle biraz (lütfen).').then(message => {
     
      var espriler = ['Bence bu kanal Çok kötü.','Bu kanalı hayatımda hiç görmedim... İlginç..','Bu kanal hayatımda gördüğüm en berbat kanal sanırım.','Bu kanal için çok uzak yollardan geliyorum.','Bu kanalı çok beğendim.','Bu kanalda küfür koruması açık mı?','Bu kanalı ayarlardan geliştirmelisiniz'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];//lyra
            if (!aktif)  message.edit(`${espri}`);
 });
  }
//yorumda yorum yok öyle mi
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yorum'],
  permLevel: 0
};
//yorumda yorum yok öyle mi
exports.help = {
  name: 'yorum',
  description: 'Espri yapar.',
  usage: 'espri'
};
