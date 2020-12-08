const { Console } = require("console");
const { MessageAttachment } = require("discord.js");
const fs = require('fs')

var deck = ["786003064758206504", "786003018424254474", "786003064615469087", "786003018348494875", "786003064644567040", "786003064644567040", "786003018356228106", "786003018364616724", "786003064473518091", "786003018449551400", "786003064561729556", "786003017995386881", "786003064585846835", "786003018181115905", "786003064556355644", "786003017929195522", "786003064565268490", "786003018117414913", "786003064481906748", "786003018008100906", "786003064271142964", "786003018193174578", "786003064594890752", "786003018134716417"];
exports.run = (app, message) => {
    const resolve = require("path").resolve;
    var path = './Cards/Clubs/AceClubs.png';
    console.log(resolve(path));
    if (fs.existsSync(path)) {
        let hand = [];
        for(var i = 0; i < 5; i++){
            hand.push(deck[Math.floor(Math.random() * deck.length)]);
        }
        console.log(hand);
        let attach = new MessageAttachment(path);
        message.channel.send(attach).then(m => {
            for(var i = 0; i < hand.length - 1; i++){
                m.react(hand[i]);
            }
            m.react(hand[hand.length - 1])
                .then(r => {
                    const reactFilter = (reaction, user) => hand.includes(reaction.emoji.id);
                    m.awaitReactions(reactFilter, { max: 1 })
                        .then(collected => {
                            const reaction = collected.first();
                            var path = "Cards/";
                            if(reaction.emoji.name.includes("Spades")){
                                path = path + "Spades/";
                            }
                            else if(reaction.emoji.name.includes("Clubs")){
                                path = path + "Clubs/";
                            }
                            path = path + reaction.emoji.name + ".png";
                            attach = new MessageAttachment(path);
                            message.channel.send(attach)
                        })
                        .catch(console.error)
                })
        });
    }
    else {
        console.log("File doesn't exist");
    }
}