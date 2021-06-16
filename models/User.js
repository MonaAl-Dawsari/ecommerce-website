const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const salt=10;

const userSchema =new  mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
       
    }, 
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,

    },
    phoneNumber:{
        type:Number,
        default: 0500000000

    },
    img: {
        type: String,
        default:"https://images.unsplash.com/photo-1579273168832-1c6639363dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1891&q=80",

    },
    
    location1:{
        type:String,

    },
    location2:{
        type:String,

    },
    location3:{
        type:String,

    },


    
    password: {
        type: String,
        
      
     }
},
{
    timestamps: true // means createdAt and updatedAt
});




// VerifyPassword
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

//change password method
userSchema.methods.changeUserpassword = function (oldPassword, newPassword) {
    if (bcrypt.compareSync(oldPassword, this.password)) {
        this.password = bcrypt.hashSync(newPassword, salt);
        return 1;
    } else {
        return 0;
    }

}


const User=mongoose.model('User', userSchema);
module.exports=User;




