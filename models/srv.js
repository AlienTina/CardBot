const {Schema, model} = require('mongoose');

var srv = new Schema({
    _version: Number,
    guildID: String,
    customPrefix: String
});
module.exports = model('srv', srv, 'srv');