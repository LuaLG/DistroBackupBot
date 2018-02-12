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
    if(message.content.toLowerCase().startsWith(prefix + "backup")) {
    message.author.send(`Keep this key safe this is how you retrieve your server data: '${message.author.id + message.guild.id}'`)
    console.log(message.guild.channels)
    console.log(message.guild.roles)
    console.log(message.guild.iconURL)
    console.log(message.guild.name)
    } else
    if (message.content.toLowerCase().startsWith(prefix + "help")) {
        message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
        message.author.send()
        var embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setFooter("More Commands Coming Send me Ideas at Dawn#066 or Setting#1337")
          .setTitle("Commands")
          .addField("Prefix", prefix)
          .addField("Commands", "backup,ping,say")
          .addField("Notes", "None")
        message.author.sendEmbed(embed);
    } else
    if(message.content.toLowerCase().startsWith(prefix + "retrieve")) {
        var embed = new Discord.RichEmbed()
          .setAuthor(message.author.username,message.author.iconURL)
          .setColor("RANDOM")
          .setDescription("Command not finished")
          .addField("Retriever Id", args)
          .setFooter(message.author.username)   
    }
    
});

client.login(token)