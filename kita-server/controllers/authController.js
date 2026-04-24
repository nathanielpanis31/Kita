const UserModel = require('../models/user')
const bcrypt = require('bcrypt')        // ← import bcrypt

const registerUser = (req, res) => {
    const { fullName, userName, registerPassword } = req.body

    // bcrypt.hash() scrambles the password
    // the 10 means "how hard to scramble" — 10 is the standard
    bcrypt.hash(registerPassword, 10)
    .then(hashedPassword => {
        // now we save the SCRAMBLED version, not the real password
        return UserModel.create({ fullName, userName, password: hashedPassword })
    })
    .then(user => res.json({ message: "Success", user: { fullName: user.fullName, userName: user.userName } }))
    .catch(err => res.json(err))
}

const loginUser = (req, res) => {
    const { userName, registerPassword } = req.body

    UserModel.findOne({ userName: userName })
    .then(user => {
        if (!user) return res.json("User does not exist")

        // bcrypt.compare() checks if the typed password matches the scrambled one
        // it never "unscrambles" — it just checks if they match
        return bcrypt.compare(registerPassword, user.password)
        .then(isMatch => {
            if (isMatch) {
                res.json({ message: "Success", user: { fullName: user.fullName, userName: user.userName } })
            } else {
                res.json("Incorrect password")
            }
        })
    })
    .catch(err => res.json(err))
}

module.exports = { registerUser, loginUser }