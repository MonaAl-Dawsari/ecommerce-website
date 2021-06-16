const express = require('express');

const router = express.Router();

//

const moment = require('moment');

var methodOverride = require('method-override');

const isLoggedIn = require("../helper/isLoggedIn")

// Use method override
router.use(methodOverride('_method'));

// Import Model
const Product = require("../models/Product");

// Grab the form data
router.use(express.urlencoded({extended: true}));



// HTTP GET - ROOT ROUTE OF OUR APPLICATION
// router.get('/', (req, res) => {
//     // res.send("Welcome to Blog App");
//     res.render("home/index", {welcoemMessage: "sultana shop"});
// });

router.get("/", (req, res) => {
    // console.log(req.user);
    // Find all Articles
    // Product.findOne({name : "banana"}) => will give me one prodrect with name banana
    Product.find() // => give me all prodects 
    .then(products => {
        // console.log(products)
        res.render("home/index", {products});
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;



