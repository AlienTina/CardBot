const enmap = require('enmap');
let gameData = new enmap();

var cards = ["2Clubs", "3Clubs", "4Clubs", "5Clubs", "6Clubs", "7Clubs", "8Clubs", "9Clubs", "10Clubs", "AceClubs", "JClubs", "KClubs", "QClubs", "2Spades", "3Spades", "4Spades", "5Spades", "6Spades", "7Spades", "8Spades", "9Spades", "10Spades", "AceSpades", "JSpades", "KSpades", "QSpades"];

var deck = new Array(cards.length * 2).fill(cards).flat();

module.exports = {
    start : function (players, server, message){
        var tempDeck = deck;
        for(var i = 0; i < players.length; i++){
            var playerHand = [];
            players[i] = players[i].replace(/[\\<>@#&!]/g, "");
            gameData.set(server, players[i], i.toString());
            for(var card = 0; card < 6; card++){
                var num = Math.floor(Math.random() * 6);
                playerHand[card] = tempDeck[num];
                tempDeck.splice(num, 1);
            }
            gameData.set(server, playerHand, i.toString() + " playerHand");
        }
        gameData.set(server, tempDeck, "deck");
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

    flip : function(card, server, message, app){
        var currTurn = gameData.get(server, "currTurn");
        var playerTurn = gameData.get(server, currTurn);
        if(playerTurn == message.author.id){
            var hand = gameData.get(server, currTurn + " playerHand");
            var flippedCard = app.emojis.cache.find(emoji => emoji.name === hand[card]);
            message.channel.send("You just flipped a <:" + hand[card] + ":" + flippedCard + ">");
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