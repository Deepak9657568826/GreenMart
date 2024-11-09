const { OrderModel } = require("../model/order.model");


const placeOrder = async (req, res) => {
    const paylaod = req.body;

    try {
        const placeOrder = new OrderModel(paylaod)
        await placeOrder.save();

        res.status(200).json({ msg: "new order placed successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const allorder = await OrderModel.find()
        res.status(200).json({ msg: "All order list" ,  allorder })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const updateOrder= async (req, res) => {
    const paylaod = req.body;
    const {id} = req.params;

    try {
        const updateorder = await OrderModel.findByIdAndUpdate({_id : id} , paylaod)
        res.status(200).json({ msg: "order deatils updated successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const deleteOrder= async (req, res) => {
    const {id} = req.params;
    try {
        const deleteprder = await OrderModel.findByIdAndDelete({_id : id})
        res.status(200).json({ msg: "order deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports ={
    placeOrder ,
    getAllOrder , 
    updateOrder , 
    deleteOrder
}
