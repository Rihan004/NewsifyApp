const Post = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username profilePicture'); // Populate user info
        res.render('body', { posts });
    } catch (err) {
        console.error(err);
        req.flash('errorMessage', 'Failed to fetch posts');
        res.redirect('/');
    }
};

module.exports = getAllPosts;