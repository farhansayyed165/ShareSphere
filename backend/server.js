const express = require("express");
// const mongoose = require("mongoose");
const connectDb = require("./config/dbConnect");
const errorHander = require("./middleware/errorHandler");
connectDb()

const app = express();
const port = process.env.PORT ? process.env.PORT:5000 ;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
app.use(express.json());
app.use(errorHander);

app.use("/api/users", require("./routes/userRoute"))

app.use("/api/posts",require("./routes/postsRoute"));

app.use("/api/comments", require("./routes/commentRoute"))

app.listen(port, ()=>{
    console.log(`server listening to port ${port}`)
})