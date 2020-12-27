const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path")
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

client.queue = new Map()


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("message", message => {
  const dm = client.channels.get("790484155615936522");
  if (message.channel.type === "dm") {
const dcse = new Discord.RichEmbed()
.setTitle("Dm'den Mesaj")

.addField(':black_small_square: Gönderen:', ` \`${message.author.tag}\` `)
.addField(':black_small_square: Mesaj', ` \`${message.content} \``)
.setImage("https://cdn.discordapp.com/attachments/777461715968720937/785140639737184306/yorumyoq.png")
    .setThumbnail("https://cdn.discordapp.com/attachments/777461715968720937/786520768787513364/b32356d93573bc9e737046d6fbf6d6b7.webp")
dm.send(dcse)




    if (message.author.bot) return;
      }
    });
 


client.on("guildCreate", guild => {
  
  let dcs_kanal = client.channels.get("784776025393201162")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUYA EKLENDİM")
.setColor("GREEN")
.addField(':black_small_square: Sunucu İsmi', `\`${guild.name}\``)
.addField(':black_small_square: Üye Sayısı', `\`${guild.members.size}\``)
.addField(':black_small_square: Kurucu', `\`${guild.owner.user.tag}\``)
 
dcs_kanal.send(dcs)
});

client.on("guildDelete", guild => {
  let dcs_kanal = client.channels.get("784776025393201162")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUDAN AYRILDIM")
.setColor("RED")
.addField(':black_small_square: Sunucu İsmi', `\`${guild.name}\``)
.addField(':black_small_square: Üye Sayısı', `\`${guild.members.size}\``)
.addField(':black_small_square: Kurucu', `\`${guild.owner.user.tag}\``)
dcs_kanal.send(dcs)
  
  
});


client.on('message', async msg => {
      let preffix = db.fetch(`prefix_${msg.guild.id}`)
      

    const emdebiye = new Discord.RichEmbed()
    .setTitle(`Yorum`)
    .setColor(`#99a3ec`)
     .setDescription(`Bu sunucuda kullanılan prefix **${preffix ? preffix : ayarlar.prefix}** olarak ayarlanmıştır. **__${preffix ? preffix : ayarlar.prefix}yardım__** yazarak yardım komutlarını görebilirsiniz. Eğer dili değiştirmek istiyorsanız **__${preffix ? preffix : ayarlar.prefix}dil__** yazmanız yeterlidir. \n\n The prefix used on this server is set to **${preffix ? preffix : ayarlar.prefix}** \n if you want, you can see the help commands by typing **__${preffix ? preffix : ayarlar.prefix}help__** If you want to change the language, just type **__${preffix ? preffix : ayarlar.prefix}language__** \n\n
      `)
    
    .setThumbnail("https://cdn.discordapp.com/attachments/777461715968720937/786520768787513364/b32356d93573bc9e737046d6fbf6d6b7.webp")
.setImage("https://cdn.discordapp.com/attachments/777461715968720937/785140639737184306/yorumyoq.png")
    
  if (msg.content === `yorum`)  msg.channel.send(emdebiye);
    
}); 

client.on('message', async msg => {
      let preffix = db.fetch(`prefix_${msg.guild.id}`)
      

    const emdebiye = new Discord.RichEmbed()
    .setTitle(`Yorum`)
    .setColor(`#99a3ec`)
      .setDescription(`Bu sunucuda kullanılan prefix **${preffix ? preffix : ayarlar.prefix}** olarak ayarlanmıştır. **__${preffix ? preffix : ayarlar.prefix}yardım__** yazarak yardım komutlarını görebilirsiniz. Eğer dili değiştirmek istiyorsanız **__${preffix ? preffix : ayarlar.prefix}dil__** yazmanız yeterlidir. \n\n The prefix used on this server is set to **${preffix ? preffix : ayarlar.prefix}** \n if you want, you can see the help commands by typing **__${preffix ? preffix : ayarlar.prefix}help__** If you want to change the language, just type **__${preffix ? preffix : ayarlar.prefix}language__** \n\n
      `)
    
    .setThumbnail("https://cdn.discordapp.com/attachments/777461715968720937/786520768787513364/b32356d93573bc9e737046d6fbf6d6b7.webp")
.setImage("https://cdn.discordapp.com/attachments/777461715968720937/785140639737184306/yorumyoq.png")
    
  if (msg.content === `Yorum`)  msg.channel.send(emdebiye);
    
});


client.login(ayarlar.isotoken);
