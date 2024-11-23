const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postModel = require('../models/post');
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
                        res.redirect("/")
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
        
        let user = await userModel.findOne({email : email});
        if(!user) return res.send("Invalid Credintials");

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
               let token =  generateToken(user);
               res.cookie("token" , token);
            //    res.send("You are successfully logged in ")
               res.redirect("/")
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
    res.redirect("/users/login");
 }


 module.exports.UserProfile = async function (req , res) {
    try {
        const user = await userModel.findById(req.user._id)
            .populate({
                path: 'posts',
                options: { sort: { createdAt: -1 } } // Sort posts by most recent
            });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('UserProfile', { user }); // Ensure the EJS file is named `profile.ejs`
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
 }

 module.exports.EditProfile = async function (req , res) {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('editProfile', { user }); // Ensure you have `editProfile.ejs` for editing profile
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
 }

 module.exports.UpdateProfile = async function (req , res) {
    const { name, bio, location } = req.body;

    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the user's profile details
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        user.updatedAt = Date.now();

        if (req.file) {
            user.profilePicture = req.file.buffer; // Assuming you're using Multer for file uploads
        }

        await user.save();

        res.redirect('/users/userprofile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
 }

 module.exports.Profile = async function (req , res) {
    try {
        const user = await userModel.findById(req.params.id);  // Get the user's details
        const posts = await postModel.find({ user: user._id })  // Get all posts by this user
            .populate('user', 'name profilePicture')
            .sort({ createdAt: -1 });

        res.render('profile', { user, posts });  // Render the profile page with user data and their posts
    } catch (err) {
        console.error(err);
        req.flash('errorMessage', 'User not found');
        res.redirect('/');
    }
 }