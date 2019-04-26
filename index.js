const Discord = require('discord.js');
//const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const prefix = ".";
const token = process.env.token;

var fs = require("fs");
var adjectives = JSON.parse(fs.readFileSync("adjectives.json"));
var items = JSON.parse(fs.readFileSync("items.json"));
var monsters = JSON.parse(fs.readFileSync("monsters.json"));


client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  //console.log(message.content);
  client.user.setActivity('.item | .monster | .ping')
  if (message.content.startsWith(`${prefix}monster`)) message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + monsters[Math.floor(Math.random()*monsters.length)] + "**")
  else if(message.content.startsWith(`${prefix}item`)) message.channel.send('<@' + message.author.id + '> | **' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)] + "**")
  else if (message.content === `${prefix}ping`) message.channel.send('<@' + message.author.id + '> | **' + client.ping + " ms**");
})

client.login(token);
