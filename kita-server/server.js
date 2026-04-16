const express = require("express");
const mongoose =require('mongoose')
const cors = require("cors");
const UserModel = require("./models/user")
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/register', (req, res) => {
    const { fullName, userName, registerPassword } = req.body

    UserModel.create({ fullName, userName, password: registerPassword })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("server is running")
})

