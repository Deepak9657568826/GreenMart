const { CartModel } = require("../model/cart.model");
const { ProductModel } = require("../model/product.model");

const addProductToCart = async (req, res) => {
      const paylaod = req.body;
    try {
        const addProduct = new CartModel(paylaod)
        await addProduct.save();
        res.status(200).json({ msg: "product added to cart successfully"  , addProduct})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const individual_Cart_Product = async (req, res) => {
      const id = req.body.userId
    try {
        const allProduct = await CartModel.find({userId : id })
        res.status(200).json({ msg: "All Cart Poduct" ,  allProduct })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const deleteCartProduct= async (req, res) => {
    const {id} = req.params;
    try {
        const deleteProduct = await CartModel.findByIdAndDelete({_id : id})
        res.status(200).json({ msg: "Product remove from cart" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
  addProductToCart , 
  individual_Cart_Product , 
  deleteCartProduct
}
