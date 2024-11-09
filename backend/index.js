const express = require("express");
const { connection } = require("./config/db.cofig");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { orderRouter } = require("./routes/order.route");
require('dotenv').config()

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ "msg": "This is home page" });
})



app.use("/", userRouter)
app.use("/", productRouter)
app.use("/", orderRouter)

const PORT = process.env.PORT || 4500

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to database");
        console.log(`Server running on port  ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})