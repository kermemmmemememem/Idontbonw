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
    var serverQueue = queue.get(message.guild.id);//böyle amk

   var espriler = ['https://www.youtube.com/watch?v=zqBnYGwlr0Q','https://www.youtube.com/watch?v=7rbgYh9fbkA', 'https://www.youtube.com/watch?v=mzJqxT1UGho', 'https://www.youtube.com/watch?v=ZGrWry_4Q8s', 'https://www.youtube.com/watch?v=W9P_qUnMaFg', 'https://www.youtube.com/watch?v=DKbfBSrjVHA', 'https://www.youtube.com/watch?v=WTsmIbNku5g', 'https://www.youtube.com/watch?v=AXnqkVTFUqY'];
        var espri = espriler[Math.floor(Math.random() * espriler.length)];//lyra
          
  
    var voiceChannel = message.member.voiceChannel;//tüm thisleri message yap 

    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);//böyle amk

    var voiceChannel = message.member.voiceChannel;//tüm thisleri message yap 
        
    const voiceChannelAdd = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**<:Yorum_x:786578064561012746> Lütfen herhangi bir sesli kanala katılınız.**`)
     if (!aktif)if (!voiceChannel) return message.channel.send(voiceChannelAdd);

    var permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      const warningErr = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<:Yorum_x:786578064561012746>  **Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.**`)
       if (!aktif)return message.channel.send(warningErr);
    }
    if (!permissions.has('SPEAK')) {
      const musicErr = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<:Yorum_x:786578064561012746> Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
       if (!aktif)return message.channel.send(musicErr);
    }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      var playlist = await youtube.getPlaylist(url);
      var videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        var video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message.message, voiceChannel, true);
      }
      const PlayingListAdd = new RichEmbed()
      .setColor("RANDOM")
      .setDescription(`[${playlist.title}]  ${espri} adlı şarkı oynatma listesine Eklendi!`)
       if (!aktif)return message.channel.send(PlayingListAdd);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
      try {
          var videos = await youtube.searchVideos(searchString, 10);
          
          var r = 1
        
          var video = await youtube.getVideoByID(videos[r - 1].id);
        } catch (err) {
          console.error(err);
          const songNope = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`<:Yorum_x:786578064561012746> Aradığınız isimde bir şarkı bulunamadı!`) 
           if (!aktif)return message.channel.send(songNope);
        }
      }
      return handleVideo(video, message, voiceChannel);
    }

    async function handleVideo(video, message, voiceChannel, playlist = false) {
        var serverQueue = queue.get(message.guild.id);
        
        var song = {
          id: video.id,
          title: video.title,
          durationh: video.duration.hours,
          durationm: video.duration.minutes,
          durations: video.duration.seconds,
          url: `  ${espri}`,
          thumbnail: ` ${espri} `,
          requester: message.author.tag,
        };
        if (!serverQueue) {
          var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 3,
            playing: true
          };
          queue.set(message.guild.id, queueConstruct);
      
          queueConstruct.songs.push(song);
      
          try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
          } catch (error) {
            console.error(`Ses kanalına giremedim HATA: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`❌ **Ses kanalına giremedim HATA: ${error}**`);
          }
        } else {
          serverQueue.songs.push(song);
          
          if (playlist) return undefined;
      
          const songListBed = new RichEmbed()
          .setColor("RANDOM")
          .setDescription(`<:Yorum_tik:786578062955118612> Rastgele bir şarkı kuyruğa eklendi!`)
          return message.channel.send(songListBed);
        }
        return undefined;
      }
        function play(guild, song) {
        var serverQueue = queue.get(guild.id);
      
        if (!song) {
          serverQueue.voiceChannel.leave();
          voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
      
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
          .on('end', reason => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        
        let y = ''
        if (song.durationh === 0) {
            y = `${song.durationm || 0}:${song.durations || 0}`
        } else {
            y = `${song.durationh || 0}:${song.durationm || 0}:${song.durations || 0}`
        }

        const playingBed = new RichEmbed()
        .setColor("GREEN")
        .setAuthor(`Rastgele Bir Şarkı Oynatılıyor`, song.thumbnail)
        .addField("**Oynatan:**", `${song.requester}`, true)
        .setThumbnail("https://cdn.discordapp.com/attachments/777461715968720937/786520768787513364/b32356d93573bc9e737046d6fbf6d6b7.webp")
         if (!aktif)serverQueue.textChannel.send(playingBed);
          
             
      }  
};

exports.conf = {
    enabled: true,
    aliases: ['rastgele'],
    permLevel: 0
};

exports.help = {
    name: 'rastgele',
    description: 'Belirttiğiniz şarkıyı bulunduğunuz sesli kanalda çalar/oynatır.',
    usage: 'oynat [şarkı adı]'
};