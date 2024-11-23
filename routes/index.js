const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const isLoggedIn = require('../middleware/isLoggedIn');
const Post = require('../models/post');
const postModel = require('../models/post');

router.get("/" , isLoggedIn ,async function(req , res) {
    try {
        // Fetch the logged-in user details using req.user._id
        const user = await userModel.findById(req.user._id);
        const Uname = req.user.name;
        const Uemail = req.user.email;

        // Fetch all posts and populate the 'user' for posts and 'user' for comments
        const posts = await postModel.find()
            .populate('user', 'name profilePicture')  // Populate user info for posts
            .populate({
                path: 'comments.user',  // Populate user info for each comment
                select: 'name profilePicture'  // Only include the user name and profile picture
            })
            .sort({ createdAt: -1 }); 

        // Render the body page with the posts and user details
        res.render('body', { posts, Uname, Uemail, user });
    } catch (err) {
        console.error(err);
        req.flash('errorMessage', 'Failed to fetch posts');
        res.redirect('/login');
    }
});


router.get("/login" , function(req, res){
    res.render("login");
});

router.get("/signup" , function(req, res){
    res.render("signup");
});


module.exports = router;