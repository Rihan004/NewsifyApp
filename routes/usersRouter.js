const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); 
const {registerUser}  = require('../controllers/authController');
const {loginUser} = require('../controllers/authController');
const {logout} = require('../controllers/authController');
const {UserProfile} = require('../controllers/authController');
const {EditProfile} = require('../controllers/authController');
const {UpdateProfile} = require('../controllers/authController');
const {Profile} = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get("/" , function(req , res ){
    res.send("Hiie its working ");
});

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/logout" , logout );
router.get("/userprofile" , isLoggedIn , UserProfile );
router.get("/userprofile/edit" , isLoggedIn , EditProfile );
router.get("/:id" , isLoggedIn , Profile );
router.post("/userprofile/update" , isLoggedIn ,upload.single('profilePicture'), UpdateProfile );




module.exports = router;
