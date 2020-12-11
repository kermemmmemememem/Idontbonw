
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db");
//yorumda yorum yok öyle mi

exports.run = (client, message) => {
  let aktif = db.has(`lang_${message.guild.id}`) === false; 
  if (!aktif) message.channel.send('Please wait...').then(message => {
    
      var espriler = ['I think this channel is very bad.', 'I have never seen this channel in my life... Interesting..', 'I think this channel is the worst Channel I have ever seen in my life.', 'I come from very distant roads for this channel.', 'I loved this channel.', 'Is profanity protection on this channel?', 'Is there Ad protection on this channel?', 'You have to develop this channel.'];
     var espri = espriler[Math.floor(Math.random() * espriler.length)];//lyra
          if (!aktif)  message.edit(`${espri}`);
 });
  }
//yorumda yorum yok öyle mi
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['comment'],
  permLevel: 0
};
//yorumda yorum yok öyle mi
exports.help = {
  name: 'comment',
  description: 'Espri yapar.',
  usage: 'espri'
};
