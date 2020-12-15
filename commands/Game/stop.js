const gameManager = require("../../functions/GameManager.js");

exports.run = (app, message) => {
    gameManager.stop(message.guild.id);
    message.channel.send("Game stopped");
}