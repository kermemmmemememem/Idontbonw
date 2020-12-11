const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    
    let p = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
    let color = db.fetch(`color_${message.guild.id}`) || '#fff000';
    let lang = args[0];

    if (db.has(`lang_${message.guild.id}`) === true) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`<:Yorum_x:786578064561012746> You can't use this command because you don't have administrator permission.`)
    } else {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`<:Yorum_x:786578064561012746> Bu komutu kullanabilmek için yönetici yetkisine sahip olmalısın!`)
    }

    if (!lang) return message.reply(`<:Yorum_x:786578064561012746> Bir dil seçmelisin. \`EN\`, \`TR\` / You have to choose a language. \`EN\`, \`TR\` `)
    if (lang != 'EN' && lang != 'TR') return message.reply(`<:Yorum_tik:786578062955118612> Available languages: \`EN\`, \`TR\``)    

    if (lang === 'EN') {
        let aktif = db.has(`lang_${message.guild.id}`) === true
        if (aktif) return message.reply(`<:Yorum_x:786578064561012746> Hey, Bot language is already in english.`)
        db.set(`lang_${message.guild.id}`, true)
        message.channel.send(`<:Yorum_tik:786578062955118612> Successfully updated the language to English.`)
    }

    if (lang === 'TR') {
        let deaktif = db.has(`lang_${message.guild.id}`) === false
        if (deaktif) return message.reply(`<:Yorum_x:786578064561012746> Botun dili zaten türkçe.`)
        db.delete(`lang_${message.guild.id}`)
        message.channel.send(`<:Yorum_tik:786578062955118612> Botun dili başarıyla Türkçe olarak ayarlandı.`)
    }

}

exports.conf = {
    aliases: ['dil'],
    permLevel: 0
}

exports.help = {
    name: 'language'
}