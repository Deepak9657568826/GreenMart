require('dotenv').config()
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const {token} = req.body
    try {
        if (!token) {
            res.status(200).json({ msg: "Please login first" })
        }
        jwt.verify(token, process.env.secret_key, function (err, decoded) {
            if (err) {
                res.status(200).json({ isValid: false })
            }
            else {
                res.status(200).json({ isValid: true })
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    verifyToken
}