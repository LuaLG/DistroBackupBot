const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const client = new Discord.Client();
const config = require("./config.json")
const package = require("./package.json")
const token = config.token //retrives token
const prefix = config.prefix

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "Distro"
});

client.on("ready", function () { // Tells Console that it is ready to be ran!
    console.log("Distro is ready")
});
client.on("message", function (message) {
    if (message.author.equals(client.user)) return;
    if (message.channel.type === 'dm') return message.reply("You cant use me in PM."); // prevent commands via dm
    const args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
    if (message.content.toLowerCase().startsWith(prefix + "ping")) {
        message.channel.send("Pong!")
    } else
    if (message.content.toLowerCase().startsWith(prefix + "say")) {
        message.channel.send(args.join(" "))
    }
    if (message.content.toLowerCase().startsWith(prefix + "backup")) {
        if (message.guild.owner.id != message.author.id) return message.reply("You need to be the server owner to backup the server")
        message.author.send(`Keep this key safe this is how you retrieve your server data: \`${message.author.id}\``)
        console.log(message.guild.channels)
        console.log(message.guild.roles)
        console.log(message.guild.iconURL)
        console.log(message.guild.name)
        //mysql method soon
    } else
    if (message.content.toLowerCase().startsWith(prefix + "help")) {
        message.reply(":white_check_mark: I have sent a list of commands to you check your DM's :white_check_mark:")
        message.author.send()
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("More Commands Coming Send me Ideas at Dawn#0666 or Setting#1337")
            .setTitle("Commands")
            .addField("Prefix", prefix)
            .addField("Commands", "backup,ping,say,retrieve")
            .addField("Notes", "None")
        message.author.sendEmbed(embed);
    } else
    if (message.content.toLowerCase().startsWith(prefix + "retrieve")) {
        if (!args) return message.reply("Please provide the personal ID we provided you")
        var embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.iconURL)
            .setColor("RANDOM")
            .setDescription("Command not finished")
            .addField("Retriever Id", args)
            .setFooter(message.author.username)
    } else
    if (message.content.toLowerCase().startsWith(prefix + "serverinfo")) {
        var embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor("RANDOM")
            .setThumbnail(message.guild.iconURL)
            .setDescription(`Owner: ${message.guild.owner}`)
            .addField("Member Count", message.guild.memberCount, true)
            .addField("Roles", message.guild.roles.size, true)
            .addField("Channels", message.guild.channels.size, true)
            .addField("Emojis", message.guild.emojis.size, true)
            .addField("Region", message.guild.region, true)
            .addField('Created', message.guild.createdAt.toLocaleString(), true)
            .setFooter(client.user.username, client.user.avatarURL)

        message.channel.sendEmbed(embed)
    } else
    if (message.content.toLowerCase().startsWith(prefix + "userinfo")) {
        var mtarget = message.guild.member(message.mentions.users.first())
        var target = message.mentions.users.first()
        if (target) {
            var embed = new Discord.RichEmbed()
                .setAuthor(target.username, target.avatarURL)
                .setColor("RANDOM")
                .setThumbnail(target.avatarURL)
                .addField("Tag", target.tag, true)
                .addField("ID", target.id, true)
                .addField("Highest role", mtarget.highestRole, true)
                .addField("Created", target.createdAt, true)
                .addField("Status", target.presence.status, true)
                .setFooter(client.user.username, client.user.avatarURL)
            message.channel.sendEmbed(embed)
        }
    }
});

client.login(token)
