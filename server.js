require('dotenv').config()
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors")

const PORT = process.env.PORT || 5000;

const expresslayouts = require("express-ejs-layouts");
var flash = require('connect-flash');

// Initialize express
const app = express();

// Look for static files here in this folder
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
//app.use("/api/v1", require("./routes/index.route"));
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});
// Look into the views folder for layout.ejs file
app.use(expresslayouts);
app.use(express.urlencoded({extended:true}))

// Import Routes
const authRoute = require('./routes/auth');
const indexRoute = require('./routes/index');
const cartRoute = require('./routes/cart');
const checkoutRoute = require ('./routes/checkout');
const editUserProfileRoute=require('./routes/profile')




// Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');
const { json } = require('express');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 3000000}
}))



// Initialize Passport and Passport Session
app.use(passport.initialize());
app.use(passport.session());
app.use(json())

app.use(flash());

// Sharing information to other pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
})


// Mount Routes
app.use('/', authRoute);
app.use('/', indexRoute);
app.use('/', cartRoute);
app.use('/', editUserProfileRoute);
app.use('/', checkoutRoute);






// Setting view engine to ejs.
// Node.js to look into the folder views for all ejs files
app.set("view engine", "ejs");

mongoose.connect(
  process.env.mongoDBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true

  },
  () => {
    console.log("Mongodb connected seccessfully!!!");
  }
);

// Listen for HTTP request on PORT 4000
app.listen(PORT, () => {
  console.log(`Running on PORT  ${PORT}`);
});
