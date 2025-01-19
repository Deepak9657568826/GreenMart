const { UserModel } = require("../model/user.model");


const verifyOtp = async(req, res)=>{

    const { emailCheck, otp } = req.body;

    try {
      const user = await UserModel.findOne({ email:emailCheck }); // Find the user by email
       
      if (!user) {
        return res.status(404).json({ message: "User not found , please register first" });
      }
      else{
        if(user.otp ==  otp){
            res.status(200).json({ message: "OTP verified, you can reset your password." });
        }
        else{
            res.status(200).json({ message: "Otp invalid, please enter right Otp" });

        }
      }
       
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
}

module.exports = {
    verifyOtp
}