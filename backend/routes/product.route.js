const express  = require("express");
const { addProduct, getAllProduct, updateProduct, deleteProduct, individualProduct } = require("../controller/product.controller");
const { authmiddleware } = require("../middleware/auth.middleware");


const productRouter = express.Router();


productRouter.post("/addproduct" , authmiddleware ,  addProduct)
productRouter.get("/allproduct" , authmiddleware ,  getAllProduct)
productRouter.get("/productIndi" , authmiddleware ,  individualProduct)
productRouter.put("/updateproduct/:id" , updateProduct)
productRouter.patch("/updateproduct/:id" , updateProduct)
productRouter.delete("/deleteproduct/:id" , deleteProduct)

module.exports = {
    productRouter
}
