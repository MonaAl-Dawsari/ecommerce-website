// All my authentication routes will go here

const router = require("express").Router();
const bcrypt = require("bcrypt");
const isLoggedIn = require('../helper/isLoggedIn')
const salt = 10;




// Import passport configurations
let passport = require("../helper/ppConfig");

// Import User Model
const User = require("../models/User");



// Grab the form data
//router.use(express.urlencoded({ extended: true }));

// HTTP GET - Signup Route - To load the signup form
router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

// HTTP POST - Signup Route - To save the data
router.post("/auth/signup", (req, res) => {
   console.log(req.body);
  let user = new User(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);
   console.log(hash);

  user.password = hash;
  user
    .save()
    .then(() => {
    //   res.redirect("/");
    passport.authenticate("local", { 
        successRedirect: "/",  
        failureRedirect: "/auth/signin" })(req, res)
    })
    .catch((err) => {
      console.log(err);
      res.send("ERRROR!!!");
    });
});

// HTTP GET - Signin Route - To load the signin form
router.get("/auth/signin", (req, res) => {
  req.flash("error", "You are logged in successfully.");

  res.render("auth/signin");
});

// HTTP POST - Signin Route - To login the user
router.post(
  "/auth/signin",
  passport.authenticate("local", { 
    successRedirect: "/",  
    failureRedirect: "/auth/signin" })
);

// HTTP GET - Logout Route
router.get("/auth/logout", (req, res) => {
    req.logout();
    req.flash("error", "You are logged out successfully.");
    res.redirect("/");
})








// HTTP GET - change password 
router.get("/auth/reset", (req, res) => {
  //req.flash("error", "You are successfully signed in.");

  res.render("auth/reset");
});





router.post("/auth/reset", async (req,res)=>{

  let user = await User.findById({ _id: req.user._id })
  //check if the password change  
  console.log(user.changeUserpassword(req.body.oldPassword, req.body.newPassword));
    await user.save();

    res.redirect('/')

})








    
module.exports = router;