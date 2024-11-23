const multer = require('multer');

// Configure multer for image and video uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB size limit
    fileFilter: (req, file, cb) => {
        const mimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (mimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and videos are allowed!'), false);
        }
    }
}).fields([
    { name: 'images', maxCount: 5 },  // Allow up to 5 images
    { name: 'videos', maxCount: 2 }  // Allow up to 2 videos
]);


module.exports = upload;