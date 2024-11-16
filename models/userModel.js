const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: Buffer,
        default: ''  // You could store a URL here if using an image storage service
    },
    bio: {
        type: String,
        maxlength: 300,  // Limit the bio length
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    followers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Array of user IDs
    ],
    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }  // Assuming you'll have a Post schema
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User" , userSchema);