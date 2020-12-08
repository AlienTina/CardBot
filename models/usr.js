const {Schema, model} = require('mongoose');

var usr = new Schema({
    _version: Number,
    userID: String,
    Role: [{
        is: String,
        inClan: Number,
        path: String
    }],
    MiscRole: [{
        isVIP: Number,
        isStaff: Number
    }],
    Economy: [{
        Coins: Number
    }],
    Leveling: [{
        lvl: Number,
        xp: Number,
        toReach: Number
    }],
    Combat: [{
        hp : Number,
        damage : Number,
        defense : Number
    }],
    Inventory: [{
        Ores: [{
            Coal: Number,
            Stone: Number,
            Iron: Number,
            Gold: Number,
            Ruby: Number,
            Emerald: Number,
            Saphire: Number,
            Diamond: Number
        }],
        CurrentItems: [{
            Pickaxe: String,
            Attact: String,
            Armor: String
        }],
        obj: Array
    }]
});
module.exports = model('usr', usr, 'usr');