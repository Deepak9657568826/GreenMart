const express  = require("express");
const { addProduct, getAllProduct, updateProduct, deleteProduct, individualProduct } = require("../controller/product.controller");
const { authmiddleware } = require("../middleware/auth.middleware");


const productRouter = express.Router();


productRouter.post("/addproduct" , authmiddleware ,  addProduct)
productRouter.get("/allproduct" , authmiddleware ,  getAllProduct)
productRouter.get("/productIndi" , authmiddleware ,  individualProduct)
productRouter.put("/updateproduct/:id" , authmiddleware,  updateProduct)
productRouter.patch("/updateproduct/:id" , authmiddleware , updateProduct)
productRouter.delete("/deleteproduct/:id" , authmiddleware ,  deleteProduct)

module.exports = {
    productRouter
}
