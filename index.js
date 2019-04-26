const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

var fs = require("fs");
var adjectives = JSON.parse(fs.readFileSync("adjectives.json"));
var items = JSON.parse(fs.readFileSync("items.json"));


client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  //console.log(message.content);
  client.user.setActivity('.idea | .ideas | .ping')
  if (message.content.startsWith(`${prefix}ideas`)) message.channel.send('<@' + message.author.id + '> ' +adjectives[Math.floor(Math.random()*adjectives.length)] + " " + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)])
  else if(message.content.startsWith(`${prefix}idea`)) message.channel.send('<@' + message.author.id + '> ' + adjectives[Math.floor(Math.random()*adjectives.length)] + " " + items[Math.floor(Math.random()*items.length)])
  else if (message.content === `${prefix}ping`) message.channel.send('<@' + message.author.id + '> ' + client.ping + " ms");
})

client.login(token);
