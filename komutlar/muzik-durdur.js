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
        
    const err1 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_x:786578064561012746> Bir sesli kanalda değilsin.**`)  
   if (!aktif)  if (!voiceChannel) return message.channel.send(err1);
    const err2 = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_x:786578064561012746> Şu anda herhangi bir şarkı çalmıyor.**`)
    if (!aktif) if (!serverQueue) return message.channel.send(err2);
    serverQueue.songs = [];
    const songEnd = new RichEmbed()
    .setColor("B71C1C")
    .setDescription(`**<:Yorum_tik:786578062955118612> Şarkı kapatıldı**`)
    serverQueue.connection.dispatcher.end('');
    if (!aktif) message.channel.send(songEnd);
};

exports.conf = {
    enabled: true,
    aliases: ['bitir'],
    permLevel: 0
};

exports.help = {
    name: 'bitir',
    description: 'Oynatılan/çalan şarkıyı kapatır.',
    usage: 'bitir'
};