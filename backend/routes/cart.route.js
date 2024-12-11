const express  = require("express");

const { individual_Cart_Product, deleteCartProduct, addProductToCart } = require("../controller/cart.controller");
const { authmiddleware } = require("../middleware/auth.middleware");


const cartRouter = express.Router();


cartRouter.post("/addtocart" ,authmiddleware ,  addProductToCart)
cartRouter.get("/allcartproduct" , authmiddleware ,  individual_Cart_Product)
cartRouter.delete("/deletecartproduct/:id" , deleteCartProduct)

module.exports = {
    cartRouter
}
