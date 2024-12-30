const express = require("express");
const { connection } = require("./config/db.cofig");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { orderRouter } = require("./routes/order.route");
const cors = require("cors");
const { cartRouter } = require("./routes/cart.route");
const { verifyToken } = require("./middleware/tokenVerify.middleware");
const { Server } = require("socket.io")
const http = require("http");
const { OrderModel } = require("./model/order.model");

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter)
app.use("/", productRouter)
app.use("/", orderRouter)
app.use("/", cartRouter)
app.use("/verifyToken", verifyToken)
app.get("/", (req, res) => {
    res.status(200).json({ "msg": "This is home page" });
})

const httpServer = http.createServer(app)
const socketServer = new Server(httpServer)

const PORT = process.env.PORT || 4500

httpServer.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to database");
        console.log(`Server running on port  ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})


socketServer.on("connection", async (socket) => {
    socket.emit("start", "Web socket connection established")
    socket.on("first", (msg) => {
        console.log(msg);
    })

    const allOrder = await OrderModel.find();
    socket.emit("allorder", allOrder)

    try {
        socket.on("newOrder", async (payload) => {
            const neworder = new OrderModel(payload)
            await neworder.save()
            socketServer.emit("order", neworder)
            socketServer.emit("notificationToAdmin", {status : true})
            socketServer.emit("orderStatus", { status: true })
        })
    } catch (error) {
        socketServer.emit("orderStatus", { status: false })
    }
})



