const express = require("express");
const app = express();

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended : false}));



const port = process.env.port || 5000;

app.listen(port , () => {
    console.log("Listening to Port 5000")
})