const express  = require("express");
const { placeOrder, getAllOrder, updateOrder, deleteOrder } = require("../controller/order.controller");
const { authmiddleware } = require("../middleware/auth.middleware");

const orderRouter = express.Router();


orderRouter.post("/placeorder" , placeOrder)
orderRouter.get("/allorder" , authmiddleware ,  getAllOrder)
orderRouter.put("/updateorder/:id" , updateOrder)
orderRouter.patch("/updateorder/:id" , updateOrder)
orderRouter.delete("/deleteorder/:id" , deleteOrder)

module.exports = {
    orderRouter
}
