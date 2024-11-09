const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()


const register = async (req, res) => {
    const { name, email, password, mobileNumber } = req.body
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user);

        if (user) {
            res.status(200).json({ mes: `user already register with email ${email}` })
        }
        else {
            bcrypt.hash(password, 5, async function (err, hash) {
                if (err) {
                    res.status(400).json({ Error: err })
                }
                else{
                    const newUser = new UserModel({
                        name,
                        email,
                        password : hash,
                        mobileNumber
                    })
                    await newUser.save();
                    res.status(200).json({ mes: `user register successfully` })
                }
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        console.log(user);

        if (!user) {
            res.status(200).json({ mes: `please register first or please check email` })
        }
        else {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.status(400).json({ Error: err })
                }
                else if(result){
                    var token = jwt.sign({ tokenUser : user }, process.env.secret_key);
                    res.status(200).json({ msg:"user login successfully" , token })
                }
                else{
                    res.status(200).json({ msg:"please check password"  })
                }
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



























module.exports = {
    register,
    login
}