const {Client} = require('discord.js');
const app = new Client();
//
const fs = require('fs');
const enmap = require('enmap');
const {token, prefix} = require('./config.json');

let glob = require("glob");

fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[E] ${eventName} has been loaded`)
        app.on(eventName, event.bind(null, app));
    });
});

app.commands = new enmap("commands");
var getDirectories = function (src, callback) {
    glob("./commands" + '/**/*.js', callback);
  };
  getDirectories('test', function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      res.forEach(file => {
        if(!file.endsWith('.js')) return;
        let props = require(`${file}`);
        let commandName = file.split(".")[1].split("/")[file.split(".")[1].split("/").length - 1];
        console.log(`[C] ${commandName} has been loaded`);
        app.commands.set(commandName, props);
      });
    }
  });

app.login(token)
