const express = require("express");
const index = require("./Controller/index");
const user = require("./Controller/user");
const key = require("./Config/key")
const mongoose = require("mongoose")
const app = express();

// Connect To MongoDB
mongoose.connect( key.mongoDB, {useNewUrlParser : true})
    .then(res => {
        console.log("Connected To MongoDB")
    })
    .catch(err => {
        console.log("OPPS! Error Occured " + err)
    })


// MiddleWare
app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use("/" , index)
app.use("/" , user)
app.use(express.static("Public"))



const port = process.env.port || 5000;

app.listen(port , () => {
    console.log("Listening to Port 5000")
})