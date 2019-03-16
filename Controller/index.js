const express = require("express")
const route = express.Router();


route.get("/" , (req , res) => {
    res.render("landing")
})
const authenticate = (req ,res , next) => {
    if(!req.user){
        res.redirect("/login")
    }
    else{
        next()
    }
}
route.get("/dashbord" , authenticate , (req , res) => {
    console.log(req.user)
    res.render("dashbord" , {
        name : req.user.name
    })
})

module.exports = route;