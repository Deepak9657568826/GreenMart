const nodemailer = require("nodemailer");
require('dotenv').config()

const sendEmail = async (to, subject, text, html) => {
  console.log("enter in email section");

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dwayzode@gmail.com", 
        pass: "sgkp liyi jyuu imtz", 
      },
    });


    // Email options
    const mailOptions = {
      from: "dwayzode@gmail.com",
      to, 
      subject, 
      text, 
      html 
    };

    // Send the email
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error; 
  }
};

module.exports = { sendEmail };
