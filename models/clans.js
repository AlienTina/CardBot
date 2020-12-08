const {Schema, model} = require('mongoose');

var clans = new Schema({
    _version: Number,
    clanID: Number,
    clanOwner: String
})
module.exports = model('clans', clans, 'clans')