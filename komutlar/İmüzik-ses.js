const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyApi8Z45osNXPksUMiaItOhXsNRyRdDtto');

exports.run = async (client, message, args) => {
  const db = require("quick.db");
 let aktif = db.has(`lang_${message.guild.id}`) === false;
    const queue = client.queue;
  
    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    var voiceChannel = message.member.voiceChannel;
        
      const asd1 = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<:Yorum_x:786578064561012746> You're not on a voice channel.`)  
    if (!message.member.voiceChannel) return message.channel.send(asd1);
    const asd2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_x:786578064561012746> He's not playing any songs right now.**`)
    if (!serverQueue) return message.channel.send(asd2);

    if (!aktif) if (!args[0]) return message.reply("**<:Yorum_x:786578064561012746> Write a number to adjust the volume!**");
    serverQueue.volume = args[0];
    if (!aktif) if (args[0] > 10) return message.channel.send(`<:Yorum_x:786578064561012746> Volume maximum **10** can be set as.`)
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0]);
    const volumeLevelEdit = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_tik:786578062955118612> Set volume:** **${args[0]}**`)
    if (!aktif) return message.channel.send(volumeLevelEdit);

};

exports.conf = {
    enabled: true,
    aliases: ['volume'],
    permLevel: 0
};

exports.help = {
    name: 'volume',
    description: 'Muziğin sesini ayarlar.',
    usage: 'ses sayı'
};