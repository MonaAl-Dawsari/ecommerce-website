const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    producttype: {type: String, required: true},
    size: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
   
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product



/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = Item = mongoose.model('Item',ItemSchema);*/