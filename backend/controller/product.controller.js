const { ProductModel } = require("../model/product.model");

const addProduct = async (req, res) => {
    const paylaod = req.body;
    try {
        const addProduct = new ProductModel(paylaod)
        await addProduct.save();

        res.status(200).json({ msg: "new product added successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllProduct = async (req, res) => {
    const id = req.body;
    console.log("get form body", id);
    
    try {
        const allProduct = await ProductModel.find()
        res.status(200).json({ msg: "All product list" ,  allProduct })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const individualProduct = async (req, res) => {
      const id = req.body.userId;
      console.log("id", id);
      
    try {
        const allProduct = await ProductModel.find({userId : id })
        res.status(200).json({ msg: "All product list" ,  allProduct })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const updateProduct= async (req, res) => {
    const paylaod = req.body;
    const {id} = req.params;
    console.log(id);
    
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate({_id : id} , paylaod)
        res.status(200).json({ msg: "product update successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const deleteProduct= async (req, res) => {
    const {id} = req.params;
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete({_id : id})
        res.status(200).json({ msg: "product delete successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    addProduct ,
    getAllProduct , 
    updateProduct , 
    deleteProduct , 
    individualProduct

}
