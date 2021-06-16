// model for the Cart

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , ref : "User"} , 
    products: [{
        type: mongoose.Schema.Types.ObjectId , ref : "Product"}],

});

module.exports = Cart = mongoose.model('Cart',CartSchema);

