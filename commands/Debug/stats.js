const {MessageEmbed} = require("discord.js");
const {duration} = 
require("moment")
require("moment-duration-format");

exports.run = async(app, message) => {
    let embed = new MessageEmbed();
    embed.setColor('RANDOM')
    embed.addFields(
        { name: 'Members :mens:', value: app.users.cache.size, inline: true },
        { name: 'Guilds :tools:', value: app.guilds.cache.size, inline: true },
        { name: 'Version :page_facing_up:', value: require('../../package.json').version, inline: true },
        { name: "Ping :satellite:", value: "Pinging. . .", inline: true},
        { name: "Uptime :clock1:", value: `${duration(app.uptime).format("D [d]\n H [h]\n m [m]\n s [s]")}`, inline: true}
        )
        .setThumbnail(app.user.displayAvatarURL())
    message.channel.send(embed).then(m =>{
        // The math thingy to calculate the user's ping
        var ping = m.createdTimestamp - message.createdTimestamp;
         
        var pingField = embed.fields.findIndex(function(fields) {
            return fields.name == "Ping :satellite:";
        });
        embed.fields[pingField].value = ping;
        m.edit(embed);
    });;
}