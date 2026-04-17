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

app.post("/login", (req,res) => {
  const {userName, registerPassword} = req.body;
  UserModel.findOne({userName: userName})
  .then(user => {
    if(user) {
      if(user.password === registerPassword) {
        res.json("Success")
      } else {
        res.json("Incorrect password")
      }
    } else{
      res.json("User dont exist")
    }
  })
})

app.post('/register', (req, res) => {
    const { fullName, userName, registerPassword } = req.body

    UserModel.create({ fullName, userName, password: registerPassword })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("server is running")
})

