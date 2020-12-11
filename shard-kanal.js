const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client()

const alpike = new Discord.ShardingManager('./bot.js', {
    totalShards: 1,
    token: ayarlar.isotoken
});

alpike.spawn(); 

exports.run = (client, message, args) => {
  
alpike.on('launch', shard => {
    message.channel.send (`${shard.id}. Shard açıldı.`);
  
});

setTimeout(() => {
    alpike.broadcastEval("process.exit()");
}, 21600000);

