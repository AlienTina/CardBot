const gameManager = require("../../functions/GameManager.js");
const messageManager = require("../../events/message.js");

exports.run = (app, message) => {
    const args = message.content.slice("-".length).trim().split(' ');
    args.shift();
    console.log(args);
    gameManager.start(args, message.guild.id, message);
}