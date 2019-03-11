const express = require("express")
const user = require("../Model/User")
const route = express.Router();


route.get("/login" , (req , res) => {
    res.render("login")
})

route.get("/register" , (req , res) => {
    res.render("register" , {
        erre : "",
        errp : "",
        errn : "",
    })
})
route.post("/register" , (req , res) => {
    user.findOne({email : req.body.email}).then(response => {
        if(response){
            res.send("Already registered")
        }
        else if(!req.body.name){
            res.render("register" , {
                errn : "Please Fill The Slots"
            })
        }
        else if(!req.body.email){
            res.render("register" , {
                erre : "Please Fill The Slots"
            })
        }
        else if(!req.body.password){
            res.render("register" , {
                errp : "Please Fill The Slots"
            })
        }
        else if(req.body.password.length < 7){
            res.render("register" , {
                errp : "Password much be greater then 8 characters"
            })
        }
        else if(req.body.password !== req.body.cpassword){
            res.send("Password doesn't match")
        }
        else{    
            user({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            .save()
            .then(res => {
                console.log("Data Saved ")
            })
            .catch(err => {
                console.log("OPPS!! Error occures " + err)
            })
            res.send("Registration Completed")
        }
    })
    .catch(err => {
        console.log(err)
    })

})
    

module.exports = route;