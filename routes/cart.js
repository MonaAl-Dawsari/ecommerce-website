// All our Cart related routes will go here 

const express = require('express');

const router = express.Router();


const moment = require('moment');

var methodOverride = require('method-override');

const isLoggedIn = require("../helper/isLoggedIn")

// Use method override
router.use(methodOverride('_method'));

// Import Model
const Product = require("../models/Product");

// Grab the form data
router.use(express.urlencoded({extended: true}));


// HTTP GET - Load cart Form
// router.get("/cart", (req, res) => {
//     res.render("cart",{products: []});
// })

// HTTP POST - To post the cart
// router.post("/cart", (req, res) => {

//     let cart = new Product(req.body);

//     // Save the data to the database
//     cart.save()
//     .then(() => {
//         res.redirect("/cart");
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send("ERROR!!!");
//     })
// })

// HTTP GET - cart Index
// router.get("/cart",  (req, res) => {
//     // console.log(req.user);
//     // Find all products
//     Product.find()
//     .then(products => {
//         // console.log(products)
//         res.render("cart", {products});
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

// HTTP GET - product by ID
router.get("/cart", (req, res) => {
    // console.log(req.query.id);
    // let cart = new Product(req.body);//
    // console.log(cart)
    Product.findById(req.query.id)
    .then(product => {
        res.render("cart", {product});

       
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;