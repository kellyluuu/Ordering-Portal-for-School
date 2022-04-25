const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    bQty: {type: Number, required: true},
    bName: {type: String, required: true},
    bImg: String,
    bPrice: {type: Number, required: true},
    bId: {type: String, required: true},
})
module.exports = mongoose.model("cart", cartSchema)