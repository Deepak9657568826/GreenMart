
const { sendEmail } = require("../email");
const { OrderModel } = require("../model/order.model");


const placeOrder = async (req, res) => {
    console.log("enter in place order section");
    
    const paylaod = req.body;

    try {
        const placeOrder = new OrderModel(paylaod)
        await placeOrder.save();

        res.status(200).json({ msg: "new order placed successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const allorder = await OrderModel.find().sort({ createdAt: -1 })
        res.status(200).json({ msg: "All order list", allorder })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const orderByParticultUser = async (req, res) => {
    const id = req.body.userId;
    try {
        const allorder = await OrderModel.find({ userId: id }).sort({ createdAt: -1 })
        res.status(200).json({ msg: "All order list", orderByUser: allorder })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const updateOrder = async (req, res) => {
    const paylaod = req.body;
    console.log("data from fe..." , paylaod.status);
    const status = `${paylaod.status}`
 
    const { id } = req.params;
    try {
        const updateorder = await OrderModel.findByIdAndUpdate({ _id: id }, paylaod.status)

         console.log("email send start for order update");
         const deliveryMessage = 
  status === "delivered"
    ? ""
    : "Your order will be delivered to you soon. Please feel free to contact us if you have any questions or concerns.";

         const html = `
         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
           <h2 style="color: #4CAF50;">Thank you for your order from GreenMart!</h2>
           <p>Dear Customer,</p>
           <p>We are pleased to inform you that your order has been <strong>${status}</strong>. Here are the details of your order:</p>
           <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
             <thead>
               <tr>
                 <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Item</th>
                 <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Quantity</th>
                 <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Price</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td style="border: 1px solid #ddd; padding: 8px;">${paylaod.order.name}</td>
                 <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${paylaod.order.quantity}</td>
                 <td style="border: 1px solid #ddd; padding: 8px;">₹${paylaod.order.price}</td>
               </tr>
             </tbody>
           </table>
           <p style="margin-top: 20px;">${deliveryMessage}</p>
           <p style="margin-top: 20px;">Here is an image of your order:</p>
           <div style="text-align: center; margin-top: 20px;">
             <img src="${paylaod.order.image}" alt="${paylaod.order.name}" style="max-width: 200px; border: 1px solid #ddd; padding: 8px; border-radius: 5px;" />
           </div>
           <p style="margin-top: 20px;">Thank you for choosing GreenMart! We look forward to serving you again.</p>
           <p style="color: #888; font-size: 12px; margin-top: 20px;">If you did not place this order, please contact us immediately.</p>
         </div>
       `;
                
       await sendEmail(
        paylaod.order.email , 
        "Order update", 
        `Your order has been deliverd soon`,
        html
       )


        res.status(200).json({ msg: "order deatils updated successfully and send email" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteprder = await OrderModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ msg: "order deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    placeOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    orderByParticultUser
}
