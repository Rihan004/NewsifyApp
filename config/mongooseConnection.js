const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected")
})
.catch((err)=>{
    console.error('MongoDB connection error:', err)
})

module.exports = mongoose.connection;