const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json")
const package = require("./package.json")
const token = config.token //retrives token
const prefix = config.prefix

client.on("ready", function () { // Tells Console that it is ready to be ran!
    console.log("Distro is ready")
});
client.on("message", function (message) {
    if (message.author.equals(client.user)) return;
    if (message.channel.type === 'dm') return message.reply("You cant use me in PM."); // prevent commands via dm
    const args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
    if(message.content.toLowerCase().startsWith(prefix + "ping")) {
    message.channel.send("Pong!")
    } else
    if(message.content.toLowerCase().startsWith(prefix + "say")) {
    message.channel.send(args.join(" "))
    }
});

client.login(token)