const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
require("dotenv").config();

// this is a new variables t call below
const authRoutes = require('./routes/auth') //this is the directory of folder files
const transactionRoutes = require('./routes/transaction') //this is the directory of folder files
const budgetRoutes = require('./routes/budget')//this is the directory of folder files

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/user"); (this is the database URL)
mongoose.connect(process.env.MONGO_URL);//instead of using database URL directly just like on the above we read it from the .env file

// routes
app.use('/api', authRoutes) //this is the variables at the top
app.use('/api', transactionRoutes) //this is the variables at the top
app.use('/api/budget', budgetRoutes)//we add /budget here so that the api called will not have conflict with the transaction routhes add transaction should have it too but since its already connected with the api we wont change it but we should add it on the future api's


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`)
})