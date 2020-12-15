const gameManager = require("../../functions/GameManager.js");

exports.run = (app, message) => {
    const args = message.content.slice("-".length).trim().split(' ');
    args.shift();
    if(gameManager.isThisServerPlaying(message.guild.id)){
        if(args.length > 0){
            gameManager.flip(args[0], message.guild.id, message, app);
        }
        else{
            message.channel.send("you need to choose a card.");
        }
    }
    else{
        message.channel.send("There is no game currently running.");
    }
}