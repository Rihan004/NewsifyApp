const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


module.exports = async function (req , res , next) {
    if(!req.cookies.token){
        res.send("you need to log in first");
        res.redirect("/users/login");
    }

    try {
        let decoded = jwt.verify(req.cookies.token , process.env.JWT_KEY);
        let user = await userModel.findOne({ email : decoded.email}).select("-password");

        req.user = user;
        next();
    } catch (error) {
        res.send("Error occurred")
        return res.redirect("/")
    }
};

