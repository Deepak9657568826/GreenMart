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
const { sendEmail } = require("./email");

require('dotenv').config()
const jwt = require("jsonwebtoken")


require('dotenv').config()

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Local frontend
            "https://green-mart-cwt1.vercel.app" // Deployed frontend
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow all HTTP methods
        credentials: true, // Allow cookies and headers
    })
);

app.use("/", userRouter)
app.use("/", productRouter)
app.use("/", orderRouter)
app.use("/", cartRouter)
app.use("/verifyToken", verifyToken)
app.get("/", (req, res) => {
    res.status(200).json({ "msg": "This is home page" });
})


app.use((req, res, next) => {
    console.log("this is gglobeal data");
    next();
});


const httpServer = http.createServer(app)
const socketServer = new Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:5173", // Local frontend
            "https://green-mart-cwt1.vercel.app" // Deployed frontend
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    },
    transports: ["websocket"], // Force WebSocket to avoid polling
});

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
    console.log("Trying to connect socket...");

    // Retrieve and validate token
    const token = socket.handshake.query.token;
    if (!token || token === "null" || token === "undefined") {
        console.log("Invalid or missing token");
        socket.disconnect();
        return;
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.secret_key); // Synchronous verification
        const email = decoded.tokenUser.email; // Extract email
        console.log("Email for user:", email);

        // Emit start event
        socket.emit("start", "Web socket connection established");

        socket.on("first", (msg) => {
            console.log(msg);
        });
        socket.on("logout", (msg) => {
            console.log(msg);
        })
        socket.on("login", (msg) => {
            console.log(msg);
        })
        socket.emit("connectOne", "Socket connected")

        const allOrder = await OrderModel.find();
        socket.emit("allorder", allOrder);

        // Handle new order
        socket.on("newOrderOne", async (payload) => {
            try {
                console.log("New Order event received:", payload);

                const neworder = new OrderModel(payload);
                await neworder.save();

                console.log("Email send start...");




                const htmlContent = `
<h2>Order Confirmation</h2>
<p>Thank you for your order! Here are the details:</p>

<table border="1" cellspacing="0" cellpadding="8">
  <tr>
    <th>Product Name</th>
    <td>${neworder.name}</td>
  </tr>
  <tr>
    <th>Image</th>
    <td><img src="${neworder.image}" alt="${neworder.name}" width="100" /></td>
  </tr>
  <tr>
    <th>Quantity</th>
    <td>${neworder.quantity}</td>
  </tr>
  <tr>
    <th>Price</th>
    <td>Rs. ${neworder.price}</td>
  </tr>
  <tr>
    <th>Order Date</th>
    <td>${new Date(neworder.createdAt).toLocaleString()}</td>
  </tr>
</table>

<p>We appreciate your business! If you have any questions, feel free to contact us.</p>
<p>Thank you!</p>
`;

                // Send email
                await sendEmail(
                    email, // Receiver email address from token
                    "Your Order Confirmation",
                    "Thank you for your order!",
                    htmlContent
                );

                // Notify all clients
                socketServer.emit("order", neworder)
                socketServer.emit("notificationToAdmin", { status: true })
                socketServer.emit("orderStatus", { status: true })
            } catch (error) {
                console.log("Order creation error:", error.message);
                socketServer.emit("orderStatus", { status: false });
            }
        });
    } catch (err) {
        console.log("Token verification failed:", err.message);
        socket.disconnect(); // Disconnect on token verification failure
    }
});


