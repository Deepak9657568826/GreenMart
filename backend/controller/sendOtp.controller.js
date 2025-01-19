const crypto = require('crypto');
const twilio = require('twilio'); // Use any SMS service like Twilio
const { UserModel } = require('../model/user.model');

const accountSid = 'AC5c9036b47a695d0ef20d20d07627f2ac'; // Twilio credentials
const authToken = '683028adbf5813881f01d8c44f8119b2';
const client = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;
  console.log(mobileNumber);
  

  try {
    // Check if the mobile number exists
    const user = await UserModel.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'Mobile number not registered' });
    }
   
    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save the OTP and expiry time in the user's record
    user.otp = otp;
    // user.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    await user.save();

    // Send OTP via SMS (use Twilio or any SMS gateway)
    await client.messages.create({
      body: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
      from: '+15075541278', // Replace with your Twilio phone number
      to: `+91${mobileNumber}`,
    });

    res.status(200).json({ message: 'OTP sent successfully' , user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOtp };
