const nodemailer = require("nodemailer");
require('dotenv').config()
const sendEmail = async (to, subject, text, html) => {
    console.log("in email function");
    
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email, // Your email
        pass: process.env.password, // Replace with app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: "dwayzode@gmail.com",
      to, // Receiver email
      subject, // Email subject
      text, // Plain text body
      html, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error; // Rethrow error to catch it in the calling function
  }
};

module.exports = { sendEmail };
