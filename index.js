const Discord = require('discord.js');
//const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const prefix = ".";
const token = process.env.token;

var fs = require("fs");
var adjectives = JSON.parse(fs.readFileSync("adjectives.json"));
var items = JSON.parse(fs.readFileSync("items.json"));
var monsters = JSON.parse(fs.readFileSync("monsters.json"));
var dungeons = JSON.parse(fs.readFileSync("dungeons.json"));

client.once('ready', () => {
  console.log('Ready!')
  client.user.setActivity('.item | .monster | .dungeon')
})
client.on('message', message => {
  //console.log(message.content);
  //if (message.content.startsWith(`${prefix}monster`)) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'duel') {
    const taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size) { //|| taggedUser.id === message.author.id, '571109106752946186') {
      return message.channel.send('<@' + message.author.id + '> | **You need to tag a user in order to duel them!**');
    }
    else {
      message.channel.send('<@' + taggedUser.id + '> | **Do you accept the duel from ' + message.author.username + '?**').then(sentMessage => {
        sentMessage.react('👍')
        			.then(() => sentMessage.react('👎'))
        const filter = (reaction, user) => {
          return ['👍', '👎'].includes(reaction.emoji.name) && user.id === taggedUser.id;
        };
        
        sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
      
          if (reaction.emoji.name === '👍') {
            message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + message.author.id + '> | **Would you like to draw an item or a monster?**').then(sentMessage2 => {
              sentMessage2.react('🗡')
                    .then(() => sentMessage2.react('👹'))
              const filter = (reaction, user) => {
                return ['🗡', '👹'].includes(reaction.emoji.name) && user.id === taggedUser.id, message.author.id;
              };
              
              sentMessage2.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(collected => {
                const reaction = collected.first();
            
                if (reaction.emoji.name === '🗡') {
                  message.channel.send('item and yeah');
                } else if (reaction.emoji.name === '👹') {
                  message.channel.send('monster and yeah');
                }
              })
              .catch(collected => {
                message.channel.send('Timed out.');
              });
            });
          } else if (reaction.emoji.name === '👎') {
            message.channel.send(taggedUser.username + ' declined the challenge.');
            return;
          }
        })
        .catch(collected => {
          message.channel.send('Timed out.');
        });
      });
    }
  }
  else if (command === 'monster') {  
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)] + "**")
    else message.channel.send('<@' + message.author.id + '> | **The ' + monsters[Math.floor(Math.random()*monsters.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)] + "**")
  }  else if(command === 'dungeon') {
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | **The ' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + dungeons[Math.floor(Math.random()*dungeons.length)] + "**")
    else {
      var tempMonster = monsters[Math.floor(Math.random()*monsters.length)]
      if (tempMonster[tempMonster.length - 1] == 's') message.channel.send('<@' + message.author.id + '> | **The ' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "es**")
      else message.channel.send('<@' + message.author.id + '> | **The ' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "s**")
    }
  }
  else if(command === 'dungeon') {
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | **' + items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)] + "**")
    else message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)] + "**")
  } else if (message.content === `${prefix}ping`) message.channel.send('<@' + message.author.id + '> | **' + client.ping + " ms**");
})

client.login(token);