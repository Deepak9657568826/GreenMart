const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    availableQuantity: {
        type: Number,
    },
   
    price: {
        type: Number,
        required: true
    },
    discription: {
        type: String
    },
    state : {
        type : String , 
        enum : ["solid" , "liquid"],
        required: true
    }, 
    mobileNumber : {
        type : Number
    },
    category : {
        type : String , 
        enum : ["vegetable" , "fruit" , "grocery"],
        required: true
    },

    username: {
        type: String
    },
    userId: {
        type: String
    }

});

const ProductModel = mongoose.model("productDetails", productSchema);

module.exports = {
    ProductModel
};