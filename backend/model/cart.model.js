const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    _id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    discription:{
        type: String,
        required: true
    },
    username: {
        type: String
    },
    userId: {
        type: String
    }
})

const CartModel  = mongoose.model("carts", cartSchema)

module.exports = {
    CartModel
}