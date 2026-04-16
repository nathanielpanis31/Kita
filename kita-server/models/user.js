const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    password: String  // clean name, no register prefix
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel