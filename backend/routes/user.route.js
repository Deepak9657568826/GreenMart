const express  = require("express");
const { register, login } = require("../controller/user.controller");
const { sendOtp } = require("../controller/sendOtp.controller");
const { verifyOtp } = require("../controller/verifyOtp.controller");
const { updatePassword } = require("../controller/updatePassword.controller");

const userRouter = express.Router();


userRouter.post("/register" , register)
userRouter.post("/login" , login)

// otp send
userRouter.post("/otpsend" , sendOtp )
userRouter.post("/verifyOtp" , verifyOtp )
userRouter.post("/updatePassword" , updatePassword )

module.exports = {
    userRouter
}
