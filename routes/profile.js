const express = require('express');
const router = express.Router()
var methodOverride = require('method-override');
const multer = require('multer');
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User')
const isLoggedIn = require("../helper/isLoggedIn");
const upload=multer

router.use(methodOverride('_method'))
router.use(express.urlencoded({ extended: true }))















//isLoggedIn

    //view the user profile

    router.get('/profile',(req, res) => {
        
                res.render("profile/index");
           
    
    
    })



  
    router.get('/profile/edit',  (req, res) => {
      User.find()
      .then((user)=>{
          res.render("profile/edit", {user:user})
//console.log(user);

      }  ).catch(err=>res.send(err))
 


})



router.post("/profile/edit",(req,res)=>{


})

router.put("/profile/edit/", (req, res) => {
  let query = { _id: req.query.id }
  var data = {
      $set: req.body
  }


User.findByIdAndUpdate(query._id , data )
.then(user=>{
  console.log("here line 69"+user);
  res.redirect("/profile")

}).catch(err => {
  console.log("error line 73"+ err)
})


})




    


module.exports = router;










/*
/*
router.post('/profile/edit',  (req, res) => {
  let update = new User (req.body)
  update.save()
  .then (()=>  res.render("profile/index",{update:update}))

})*/

