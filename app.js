const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config();
const db = require('./config/mongooseConnection')
const flashMessages =  require('./middleware/flashMessages')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
const session = require('express-session');
const flash = require('connect-flash');


app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(flashMessages);

const usersRouter = require('./routes/usersRouter');
const indexRouter = require("./routes/index")
const postRouter = require('./routes/postRouter')

app.use("/" , indexRouter);
app.use("/users" , usersRouter);
app.use("/post" , postRouter);



app.listen(3000);