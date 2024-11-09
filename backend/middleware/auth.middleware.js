require('dotenv').config()
const jwt = require("jsonwebtoken")

const authmiddleware = async (req, res, next) => {
    const token = req.headers.authorization

    try {
        if (!token) {
            res.status(401).json({ msg: "not authorized, please login first" })
        }
        else {
            jwt.verify(token, process.env.secret_key, function (err, decoded) {
                if (err) {
                    res.status(400).json({ Error: err })
                }
                else {
                    console.log(decoded.tokenUser);
                    if(req.method == "POST"){
                        req.body.username =  decoded.tokenUser.name
                        req.body.userId =  decoded.tokenUser._id
                    }
                    next();
                }
            });
        }


    } catch (error) {
             res.status(500).json({error : error.message})
    }

}

module.exports = {
    authmiddleware
}