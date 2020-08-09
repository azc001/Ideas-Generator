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
  client.user.setActivity('.help')
})
client.on('message', message => {
  //console.log(message.content);
  //if (message.content.startsWith(`${prefix}monster`)) {
  if (message.channel.id == '520457693979213833') {
    if (message.attachments.size > 0 || message.embeds.length > 0) {
      message.react('539111244842532874');
        //.then(() => message.react('539111244414844929')); downvote
    }
    else {
      message.delete()
        .then(message.author.send('Please only post images in the <#520457693979213833> channel. To talk about your sprite, head to <#309107410654724096>. Thanks!'));
    }
  }
  else if (message.channel.id == '742157612879183993') {
    if (message.attachments.size > 0 || message.embeds.length > 0) {
      message.react('742161464453890109');
    }
    else {
      message.delete()
        .then(message.author.send('Please only post images in the <#742161471508840478> channel. Thanks!'));
    }
  }
  else if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'duel') {
    var prompt = "";
    const authorUser = message.author;
    const taggedUser = message.mentions.users.first();
    if (!message.mentions.users.size || taggedUser.id === message.author.id || taggedUser.id === '571109106752946186') { 
      return message.channel.send('<@' + authorUser.id + '> | **You need to tag a user in order to duel them!**');
    }
    else {
      message.channel.send('<@' + taggedUser.id + '> | **Do you accept the duel from ' + authorUser.username + '?**').then(sentMessage => {
        sentMessage.react('👍')
        			.then(() => sentMessage.react('👎'))
        const filter = (reaction, user) => {
          return ['👍', '👎'].includes(reaction.emoji.name) && user.id === taggedUser.id;
        };
        
        sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
      
          if (reaction.emoji.name === '👍') {
            message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Would you like to draw an item or a monster?**').then(sentMessage => {
              sentMessage.react('🗡')
                    .then(() => sentMessage.react('👹'))
              const filter = (reaction, user) => {
                return ['🗡', '👹'].includes(reaction.emoji.name) && (user.id === taggedUser.id || user.id === authorUser.id);
              };
              
              sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(collected => {
                const reaction = collected.first();
            
                if (reaction.emoji.name === '🗡') {
                  if (Math.random() >= 0.5) var gen1 = items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen1 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)];
                  if (Math.random() >= 0.5) var gen2 = items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen2 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)];
                  if (Math.random() >= 0.5) var gen3 = items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen3 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)];
                  message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Choose one of the prompts from the following ideas.**' + '\n' + ':one:  **' + gen1 + '**' + '\n' + ':two:  **' + gen2 + '**' + '\n' + ':three:  **' + gen3 + '**').then(sentMessage => {
                    sentMessage.react('1⃣')
                    .then(() => sentMessage.react('2⃣'))
                    .then(() => sentMessage.react('3⃣'))
                    .then(() => sentMessage.react('❌'))
                    const filter = (reaction, user) => {
                      return ['1⃣', '2⃣', '3⃣', '❌'].includes(reaction.emoji.name) && (user.id === taggedUser.id || user.id === authorUser.id);
                    };
                    sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                      const reaction = collected.first();
                      if (reaction.emoji.name === '1⃣') {
                        prompt = gen1;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '2⃣') {
                        prompt = gen2;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '3⃣') {
                        prompt = gen3;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '❌') {
                        message.channel.send('The duel was canceled by ' + user.username + '.')
                        return;
                      }
                    })
                    .catch(collected => {
                      message.channel.send('Timed out.');
                    });
                  });
          }  else if (reaction.emoji.name === '👹') {
                  if (Math.random() >= 0.5) var gen1 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen1 = 'The ' + monsters[Math.floor(Math.random()*monsters.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  if (Math.random() >= 0.5) var gen2 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen2 = 'The ' + monsters[Math.floor(Math.random()*monsters.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  if (Math.random() >= 0.5) var gen3 = adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  else var gen3 = 'The ' + monsters[Math.floor(Math.random()*monsters.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)];
                  message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Choose one of the prompts from the following ideas.**' + '\n' + ':one:  **' + gen1 + '**' + '\n' + ':two:  **' + gen2 + '**' + '\n' + ':three:  **' + gen3 + '**').then(sentMessage => {
                    sentMessage.react('1⃣')
                    .then(() => sentMessage.react('2⃣'))
                    .then(() => sentMessage.react('3⃣'))
                    .then(() => sentMessage.react('❌'))
                    const filter = (reaction, user) => {
                      return ['1⃣', '2⃣', '3⃣', '❌'].includes(reaction.emoji.name) && (user.id === taggedUser.id || user.id === authorUser.id);
                    };
                    sentMessage.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
                    .then(collected => {
                      const reaction = collected.first();
                      if (reaction.emoji.name === '1⃣') {
                        prompt = gen1;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '2⃣') {
                        prompt = gen2;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '3⃣') {
                        prompt = gen3;
                        message.channel.send('<@' + taggedUser.id + '>, ' + '<@' + authorUser.id + '> | **Your prompt is ' + prompt + '. Good luck!**');
                      }
                      else if (reaction.emoji.name === '❌') {
                        message.channel.send('The duel was canceled by ' + user.username + '.')
                        return;
                      }
                    })
                    .catch(collected => {
                      message.channel.send('Timed out or.');
                    });
                  });
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
      if (tempMonster[tempMonster.length - 1] == 's') message.channel.send('<@' + message.author.id + '> | **' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "es**")
      else message.channel.send('<@' + message.author.id + '> | **' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "s**")
    }
  }
  else if(command === 'item') {
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | **' + items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)] + "**")
    else message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)] + "**")
  } else if (command === 'help') message.channel.send("Ideas Generator, a utility RotMG bot made by `@Piggby#9767`." + '\n' + '\n' + "**Commands**" + '\n' + '*.item* - Generates an item idea using 2 formulas: <[modifier][item]> and <[item] of the [monster]>' + '\n' + '*.monster* - Generates a monster idea using 2 formulas: <[modifier][monster]> and <The [monster][monster]>' + '\n' + '.dungeon - Generates an dungeon idea using 2 formulas: <The [modifier][place]> and <[place] of [monster]s>' + '\n' + '*.duel [@opponent]* - Generates three item or monster ideas for the two participants to create.' + '\n' + '*.ping* - returns the ping of the client' + '\n' + '\n' + '**Vocabulary Lists**' + '\n' + '*Modifiers*: <https://pastebin.com/egBJifQE>' + '\n' + '*Monsters*: <https://pastebin.com/gSnFq85B>' + '\n' + '*Dungeons*: <https://pastebin.com/FeFUmQWt>');
   else if (command === 'ping') message.channel.send('<@' + message.author.id + '> | **' + client.ping + " ms**");
})

client.login(token);