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
    price: {
        type: Number,
        required: true
    },
    discription: {
        type: String
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