const Discord = require('discord.js')
const db = require('quick.db')
const kdb = new db.table("kullanici")
const conf  = require('../config.json')
const set = require('../selection/settings.json')
module.exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send( new Discord.MessageEmbed() .setColor('BLUE') .setDescription('Bu Komutu Kullanmaya Yetkin yok') .setFooter('haise burdaydi!'))

  const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
  
  if(!member) return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Sanki Bir Kullanıcıyı Etiketlemeyi Unuttun?") .setFooter('haise buradaydi!'))
  
  if(member.id === message.author.id) return message.channel.send( new Discord.MessageEmbed() .setColor('BLUE') .setDescription('Kendini Kayıt Edemezsin Dostum.') .setFooter('haise burdaydi!'));
  
  if(member.id === message.guild.OwnerID) return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Sunucu Sahibini Kayıt Edemezsin Dostum.").setFooter('haise buradaydi!'));
  
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Kullanıcı Senle Aynı Yada Senden Üst Pozisyonda!").setFooter('haise burdaydi!'))
  
  }
  
  let isim = args[1]
  if(!isim) return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Galiba Bir Isim Girmeyi Unuttun Dostum.") .setFooter('haise burdaydi!'))
  
  let yas = args[2]
  if(!yas) return message.channel.send(new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Galiba Bir Yaş Girmeyi Unuttun Dostum.").setFooter('haise buradaydi!'))
  

//if (db.fetch(`tag.${message.guild.id}`)) {
//if(!member.user.username.includes(set.taglar.tag) && !member.roles.cache.has(set.vip) && !member.roles.cache.has(set.roller.booster)) return message.channel.send('Sunucumuz şuanda taglı alımdadır. Tagımızı alıp kayıt olabilirsiniz.')
//}

if(member.roles.cache.has(set.roller.erkek) || member.roles.cache.has(set.roller.erkek2) || member.roles.cache.has(set.roller.kız) || member.roles.cache.has(set.roller.kız2)) {
  return message.channel.send( new Discord.MessageEmbed() .setColor('BLUE') .setDescription("Bu Kullanıcı Zaten Kayıtlı.").setFooter('haise burdaydi!'))
  
  }


if(!member.user.username.includes(set.taglar.tag)) {
    member.setNickname(`${set.taglar.tagsız} ${isim} | ${yas}`)
    member.roles.add(set.roller.kız)
    member.roles.add(set.roller.kız2)
    member.roles.remove(set.roller.unregister)
} 

  if(member.user.username.includes(set.taglar.tag)) {
    member.setNickname(`${set.taglar.tag} ${isim} | ${yas}`)
    member.roles.add(set.taglar.tagrol)
    member.roles.add(set.roller.kız)
    member.roles.add(set.roller.kız2)
    member.roles.remove(set.roller.unregister)
}

let mesaj = new Discord.MessageEmbed().setColor('BLUE').setDescription("Kullanıcı Başarıyla Kayıt Edildi, <@&${set.roller.kız}> ve <@&${set.roller.kız2}> Rolleri Verildi").setFooter('haise burdaydi!');
client.channels.cacge.get(set.kanallar.kayıtkanal).send(mesaj)


let mesaj = new Discord.MessageEmbed().setColor('BLUE').setDescription("Kullanıcı Başarıyla Kayıt Edildi, <@&${set.roller.kız}> ve <@&${set.roller.kız2}> Rolleri Verildi").setFooter('haise burdaydi!');

client.channels.cacge.get(set.kanallar.log).send(mesaj)



exports.conf = {
  enabled: true,
  aliases: ['kız', 'k'],
  guildOnly: true,
  permlevel: 0
};

exports.help = {
    name: 'kız'
}


//MISSS By Haise
