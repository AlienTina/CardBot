const gameManager = require("../../functions/GameManager.js");

exports.run = (app, message) => {
    if(gameManager.isThisServerPlaying(message.guild.id)){
        gameManager.stop(message.guild.id);
        message.channel.send("Game stopped");
    }
    else{
        message.channel.send("There is no game currently running.");
    }
}