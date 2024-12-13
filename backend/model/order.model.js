const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
    price: {
        type: Number,
        required: true
    },
    mobileNumber : {
        type : Number
    },
    state : {
        type : String , 
        enum : ["solid" , "liquid"],
        required: true
    },
    username: {
        type: String
    },
    status : {
        type : String,
        enum:["pending" , "confirmed", "shipped" , "out for delivery" , "delivered"] , 
        default : "pending"
    }
});

const OrderModel = mongoose.model("orderDetails", orderSchema);

module.exports = {
    OrderModel
};