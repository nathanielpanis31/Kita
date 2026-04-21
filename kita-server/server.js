const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
require("dotenv").config();

// this is a new variables t call below
const authRoutes = require('./routes/auth') //this is the directory of folder files
const transactionRoutes = require('./routes/transaction') //this is the directory of folder files

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/user");

// routes
app.use('/api', authRoutes) //this is the variables at the top
app.use('/api', transactionRoutes) //this is the variables at the top


app.listen(3001, () => {
  console.log("server is running")
})