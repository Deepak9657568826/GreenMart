
const mongoose = require("mongoose");
require('dotenv').config()

const connection = mongoose.connect(process.env.monngo_url)

module.exports = {
    connection
}