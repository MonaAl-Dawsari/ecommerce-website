// All our Cart related routes will go here 

const express = require('express');

const router = express.Router();




// Grab the form data
router.use(express.urlencoded({extended: true}));


// HTTP GET - Load checkout Form
router.get("/checkout", (req, res) => {
    res.render("checkout");
})

// HTTP POST - To post the checkout form
router.post("/checkout", (req, res) => {

    let cart = new Product(req.body);

    // Save the data to the database
    cart.save()
    .then(() => {
        res.redirect("/cart");
    })
    .catch((err) => {
        console.log(err);
        res.send("ERROR!!!");
    })
})

// HTTP GET - cart Index
router.get("/cart",  (req, res) => {
    // console.log(req.user);
    // Find all products
    Product.find()
    .then(products => {
        // console.log(products)
        res.render("cart", {products});
    })
    .catch(err => {
        console.log(err);
    })
})



module.exports = router;