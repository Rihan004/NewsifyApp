const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config();
const db = require('./config/mongooseConnection')

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");

const usersRouter = require('./routes/usersRouter');
const indexRouter = require("./routes/index")


app.use("/" , indexRouter);
app.use("/users" , usersRouter);




app.listen(3000);