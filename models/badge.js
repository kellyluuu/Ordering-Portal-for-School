const mongoose = require("mongoose")
const Schema = mongoose.Schema



const badgeSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    title: {type: String, required: true},
    field: {type: String, required: true},
    idNum: {type: Number, required: true},
    img: String,

})

module.exports = mongoose.model("badge", badgeSchema)