const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const userModel = require('../models/userModel');
const multer = require('multer');
const isLoggedIn = require('../middleware/isLoggedIn');
const upload = require('../config/multerConfig');


router.post("/create" , isLoggedIn , async function(req , res) {
    upload(req , res , async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            
            let {content} = req.body;
            if (!content && !req.files.images && !req.files.videos) {
                return res.status(400).json({ error: 'Post must contain content, an image, or a video!' });
            }

            const newPost = new postModel({
                user : req.user._id,
                content,
                images : req.files.images ? req.files.images.map(file => file.buffer) : [],
                videos: req.files.videos ? req.files.videos.map(file => ({
                    data: file.buffer,
                    contentType: file.mimetype
                })) : []
            });

            await userModel.findByIdAndUpdate(req.user._id, {
                $push: { posts: newPost._id }
            });
            const savedPost = await newPost.save();
            req.flash('success', 'Post created successfully!');
            res.redirect('/');
        } catch (error) {
            req.flash('error', 'An error occurred while creating the post.');
            res.redirect('/');
        }
    });
});

router.get("/createPost", isLoggedIn , async function (req , res) {
        res.render("createPost");
});


router.post('/vote',isLoggedIn, async (req, res) => {
    const { postId, voteType } = req.body; // `voteType` is either 'true' or 'false'
    const userId = req.user._id; // Assume user ID is available in `req.user`

    try {
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Remove user from both trueVotes and falseVotes to ensure only one vote
        post.trueVotes = post.trueVotes.filter(id => id.toString() !== userId.toString());
        post.falseVotes = post.falseVotes.filter(id => id.toString() !== userId.toString());

        // Add user to the correct vote array
        if (voteType === 'true') {
            post.trueVotes.push(userId);
        } else if (voteType === 'false') {
            post.falseVotes.push(userId);
        } else {
            return res.status(400).json({ error: 'Invalid vote type' });
        }

        await post.save();
        res.json({ success: true, trueVotes: post.trueVotes.length, falseVotes: post.falseVotes.length });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/:id/comment', isLoggedIn ,async (req, res) => {
    const { id } = req.params; // Post ID
    const { content } = req.body; // Comment content
    const userId = req.user._id; // Logged-in user's ID

    try {
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.comments.push({
            user: userId,
            content: content
        });

        await post.save();
        res.json({ success: true, comments: post.comments });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findById(req.params.id)
            .populate('user', 'name profilePicture') // Populate the post creator
            .populate({
                path: 'comments.user', // Populate the user in each comment
                select: 'name profilePicture' // Only include name and profile picture
            });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Pass the populated post object to the EJS template
        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;