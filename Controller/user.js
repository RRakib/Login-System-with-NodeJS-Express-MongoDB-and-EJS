const express = require("express")
const passport = require("passport")
const user = require("../Model/User")
const bcrypt = require("bcryptjs")
const route = express.Router();


route.get("/login" , (req , res) => {
    res.render("login")
})

route.get("/register" , (req , res) => {
    res.render("register" , {
        errors : []
    })
})
route.post("/register" , (req , res) => {
    errors = [];
    const { name , email, password} = req.body
    if( !name || !email || !password){
        errors.push({err : "Please insert all fileds"})
    }
    if( password.length < 7){
        errors.push({ err : "Password Length Must Be Greater Then 8"})
    }
    if(password !== req.body.cpassword){
        errors.push({ err : "Password Didn't match"})
    }
    if(errors.length > 0){
        res.render("register", {
            errors,
            name,
            email
        })
    }
    else{
        console.log(req.body)
        user.findOne({email : email}).then(response => {
            if(response){
                res.render("register" , {
                    errors : [{
                        err : "Already Registered"
                    }],
                    name : "",
                    email: ""
                })
            }
            else{    
                let newUser = user({
                    name,
                    email,
                    password
                })
                bcrypt.genSalt(10 , (err , salt) => 
                    bcrypt.hash(newUser.password , salt , (err , hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(res => {
                            console.log("Data Saved " + res)
                        })
                        .catch(err => {
                            console.log("OPPS!! Error occures " + err)
                        })
                    })
                ) 
                res.render("register" , {
                    errors : [{
                        err : "Successfully Registered"
                    }],
                    name : "",
                    email: ""
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
})
route.get("/dashbord" , (req , res) => {
    res.send("Dashbord")
})

route.post("/login" , (req, res , next) => {
    console.log(req.body)
    passport.authenticate("local" , {
        successRedirect : "/dashbord",
        failureRedirect : "/login"
    })(req, res, next)
})
    

module.exports = route;