const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    qty: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    price: {type: Number, required: true},
    id: {type: String, required: true},
})
module.exports = mongoose.model("cart", cartSchema)