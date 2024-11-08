const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
res.status(200).json({"msg" :"This is home page"});
})

app.listen(4500, () => {
    console.log("server running on port 4500");
})