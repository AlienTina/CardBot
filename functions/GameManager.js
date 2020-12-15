const enmap = require('enmap');
let gameData = new enmap();

module.exports = {
    start : function (players, server, message){
        for(var i = 0; i < players.length; i++){
            gameData.set(server, players[i].replace(/[\\<>@#&!]/g, ""), i.toString());
            players[i] = players[i].replace(/[\\<>@#&!]/g, "");
        }
        gameData.set(server, 0, "currTurn");
        gameData.set(server, players.length, "playerCount");
        message.channel.send("Game started on server \"" + message.guild.name + "\" (id: " + server + ").");
        this.turn(server, message);
    },

    turn : function(server, message){
        var currTurn = gameData.get(server, "currTurn");
        var player = gameData.get(server, currTurn);

        message.channel.send("<@!" + player + ">, it's your turn.");
        if(parseInt(currTurn) + 1 < gameData.get(server, "playerCount")){
            gameData.set(server, parseInt(currTurn) + 1, "currTurn");
        }
        else{
            gameData.set(server, 0, "currTurn");
        }
    },

    isThisServerPlaying : function (server){
        try{
            if(gameData.has(server, "0")){
                return true;
            }
            else{
                return false;
            }
        }
        catch{
            return false;
        }
    },

    stop : function(server){
        gameData.delete(server);
    }
}