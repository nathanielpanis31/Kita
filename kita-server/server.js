const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
require("dotenv").config();

// this is a new variables t call below
const authRoutes = require('./routes/auth') //this is the directory of folder files
const transactionRoutes = require('./routes/transaction') //this is the directory of folder files
const budgetRoutes = require('./routes/budget')//this is the directory of folder files
const goalRoutes = require('./routes/goal')

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/user"); (this is the database URL)
mongoose.connect(process.env.MONGO_URL);//instead of using database URL directly just like on the above we read it from the .env file

// routes
app.use('/api', authRoutes) //this is the variables at the top
app.use('/api', transactionRoutes) //this is the variables at the top
app.use('/api/budget', budgetRoutes)
app.use('/api/goal', goalRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
});


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`)
})