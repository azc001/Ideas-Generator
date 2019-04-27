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
})

client.on('message', message => {
  //console.log(message.content);
  client.user.setActivity('.item | .monster | .dungeon')
  if (message.content.startsWith(`${prefix}monster`)) message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)] + "**")
  else if(message.content.startsWith(`${prefix}dungeon`)) {
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | **The ' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + dungeons[Math.floor(Math.random()*dungeons.length)] + "**")
    else {
      var tempMonster = monsters[Math.floor(Math.random()*monsters.length)]
      if (tempMonster[tempMonster.length - 1] == 's') message.channel.send('<@' + message.author.id + '> | **The ' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "es**")
      else message.channel.send('<@' + message.author.id + '> | **The ' + dungeons[Math.floor(Math.random()*dungeons.length)] + " of " + tempMonster + "s**")
    }
  }
  else if(message.content.startsWith(`${prefix}item`)) {
    if (Math.random() >= 0.5) message.channel.send('<@' + message.author.id + '> | ' + items[Math.floor(Math.random()*items.length)] + ' of the ' + monsters[Math.floor(Math.random()*monsters.length)] + "**")
    else message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)] + "**")
  } else if (message.content === `${prefix}ping`) message.channel.send('<@' + message.author.id + '> | **' + client.ping + " ms**");
})

client.login(token);