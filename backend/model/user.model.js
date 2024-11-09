const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String, 
        // required: true
    }, 
    email:{
        type: String, 
        // required: true
    }, 
    password:{
        type: String, 
        // required: true
    }, 
     mobileNumber:{
        type: String, 
        // required: true
    }
});

const UserModel = mongoose.model("userDetails" , userSchema);

module.exports = {
    UserModel
};