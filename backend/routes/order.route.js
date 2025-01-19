const express  = require("express");
const { placeOrder, getAllOrder, updateOrder, deleteOrder, orderByParticultUser } = require("../controller/order.controller");
const { authmiddleware } = require("../middleware/auth.middleware");

const orderRouter = express.Router();


orderRouter.post("/placeorder"  , authmiddleware ,   placeOrder)
orderRouter.get("/allorder" ,   getAllOrder)

orderRouter.get("/particularOrder",  authmiddleware ,   orderByParticultUser)

orderRouter.put("/updateorder/:id" , authmiddleware ,  updateOrder)
orderRouter.patch("/updateorder/:id", authmiddleware ,  updateOrder)
orderRouter.delete("/deleteorder/:id" ,  deleteOrder)

module.exports = {
    orderRouter
}
