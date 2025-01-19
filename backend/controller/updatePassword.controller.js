const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt');

const updatePassword = async (req, res) => {
    const { emailCheck, newPassword } = req.body
    

    try {
        const user = await UserModel.findOne({ email:emailCheck })
        if (user) {
            const hashedPassword = await bcrypt.hash(newPassword, 5);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ message: "Password updated successfully" });
        }
        else {
            res.status(200).json({ message: "User not found" });
        }


    } catch (error) {
        res.status(200).json({ message: error.message });
    }

}

module.exports = {
    updatePassword
}