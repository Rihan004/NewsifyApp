const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {generateToken} = require('../utils/generateToken')

module.exports.registerUser = async function (req , res) {
    try {
        let {name , email , password } = req.body;
        let user = await userModel.findOne({email : email});
        if(user){
            req.flash("error" , "You already have account , please try log in ");
            //res.redirect("/")
        }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err){
                       return res.send(err.message);
                    }else{
                        let createdUser = userModel.create({
                            name,
                            email,
                            password : hash,
                        });
                        let token = generateToken(createdUser);
                        res.cookie("token" , token);
                        res.send("User created successfully");
                    }
                });
            });
        }


        
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.loginUser = async function (req , res) {
    
    try {
        let {email , password} = req.body;
        console.log(email);
        console.log(password);
        
        let user = await userModel.findOne({email : email});
        if(!user) return res.send("Invalid Credintials");

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
               let token =  generateToken(user);
               res.cookie("token" , token);
               res.send("You are successfully logged in ")
            //    res.redirect("/shop")
            }else{
                res.send("Invalid Credintials");
                // res.redirect("/");
            }
        });
    } catch (error) {
        console.log(error.message);
    }

};

module.exports.logout = async function(req , res){
    res.cookie("token" , "");
    res.send("You are logged out ")
 }