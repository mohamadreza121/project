//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let dotaSchema = mongoose.Schema({
    username: { type: String, required:true},
    rank: { type: Number, required: true},
    serviceType: { type: String, required:true},
    status: { type: String, required:true},
    price: { type: Number, required:true}
},
{
    collection:"dota"
});

module.exports =mongoose.model('Dota',dotaSchema);
