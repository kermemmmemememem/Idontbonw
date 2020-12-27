const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

          
exports.run = async(client, message, args, func) => {


  let prefix = db.fetch(`prefix_${message.guild.id}`) ? db.fetch(`prefix_${message.guild.id}`) : ayarlar.prefix 

  
  var seçenek = args[0]
  
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:Yorum_x:786578064561012746> Bu komutu kullanabilmek için "Yönetici" yetkisine sahip olmalısın.`);
  
  let preffix = db.fetch(`prefix_${message.guild.id}`)
  
    if(args[0] === "sıfırla") {
    if(!preffix) {
  message.channel.send(`<:Yorum_x:786578064561012746> Ayarlanmayan şeyi sıfırlayamazsın.`)
      return
    }
    
db.delete(`prefix_${message.guild.id}`)
message.channel.send(`<:Yorum_tik:787932687754985493> Prefix başarıyla sıfırlandı. Prefix artık **${ayarlar.prefix}**`)
    return
  }
  
  if (!args[0])
  return message.channel.send(`Bu sunucudaki prefixim: **${preffix ? preffix : ayarlar.prefix}**`)
db.set(`prefix_${message.guild.id}`, args[0])
 message.channel.send(`<:Yorum_tik:787932687754985493>  Prefix başarıyla **${args[0]}** olarak ayarlandı.\n${args[0]}prefix sıfırla yazarak prefixi sıfırlayabilirsiniz.`)



}                 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['prefix-ayarla'],
  permLevel: 4
};

exports.help = {
  name: 'prefix',
  kategori: "yetkili",
  description: 'Sunucuya özel prefix ayarlar.',
  usage: 'prefix'
};

