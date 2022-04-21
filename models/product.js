const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
    catagory: [{cata:'catagoryA'}, {cata: 'catagoryB'}], required: true})


const badgeSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    department: {type: String, required: true},
    idNum: {type: Number, required: true},
    img: {type: URL, required: true},

})

const bcSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    department: {type: String, required: true},
    email: {type: String},
    address: {type: String, required: true},
    mainNum: {type: Number, required: true},
    directNum: {type: Number},

})

module.exports = mongoose.model("Product", productSchema)