const mongoose = require("mongoose");

let itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true }
},
{
    collection: "items"
});

module.exports = mongoose.model('Item', itemSchema);