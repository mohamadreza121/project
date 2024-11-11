//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

       let heroSchema = mongoose.Schema({
           name: { type: String, required: true },
           role: { type: String, required: true },
           abilities: [{ type: String }],
           description: { type: String, required: true }
       },
       {
           collection: "heroes"
       });

       module.exports = mongoose.model('Hero', heroSchema);