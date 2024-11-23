const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model to know which user created the post
        required: true
    },
    content: {
        type: String,
        required: true,  // Content can be text
        maxlength: 5000  // Limit text length for posts
    },
    images: [{
        type: Buffer  // Array of images in Buffer format
    }],
    videos: [{
        data: Buffer,  // Video file as a Buffer
        contentType: String  // To store the video type, e.g., 'video/mp4'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Store the users who liked the post
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Store the users who disliked the post
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model for the commenter
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 500  // Limit comment length
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    trueVotes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  // Users who voted True
    }],
    falseVotes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  // Users who voted False
    }]
});


module.exports = mongoose.model("Post" , postSchema);