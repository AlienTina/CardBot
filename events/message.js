const {MessageEmbed} = require('discord.js');
const prfx = "-";
module.exports = (app, message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.indexOf(prfx) !== 0) return;
    const args = message.content.slice(prfx.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = app.commands.get(command);
    if(!cmd) return;
    cmd.run(app, message, args);
}