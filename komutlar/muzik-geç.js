const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyApi8Z45osNXPksUMiaItOhXsNRyRdDtto');


exports.run = async (client, message, args) => {
  const db = require("quick.db");
 let aktif = db.has(`lang_${message.guild.id}`) === true;
  const queue = client.queue;    
    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    var voiceChannel = message.member.voiceChannel;
        
    const err0 = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`**<:Yorum_x:786578064561012746> Bir sesli kanalda değilsin.**`) 
   if (!aktif)  if (!voiceChannel) return message.channel.send(err0);
    const err05 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_x:786578064561012746> Şu anda herhangi bir şarkı çalmıyor.**`)
    if (!aktif) if (!serverQueue) return message.channel.send(err05);
    const songSkip = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`<:Yorum_tik:786578062955118612> **Şarkı başarıyla geçildi!**`)
    serverQueue.connection.dispatcher.end('');
    if (!aktif) message.channel.send(songSkip)

};

exports.conf = {
    enabled: true,
    aliases: ['geç'],
    permLevel: 0
};

exports.help = {
    name: 'geç',
    description: 'Sıradaki şarkıya geçer. Sırada şarkı yoksa şarkıyı kapatır.',
    usage: 'geç'
};