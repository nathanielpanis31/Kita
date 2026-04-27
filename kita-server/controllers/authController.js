const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = (req, res) => {
    const { fullName, userName, registerPassword } = req.body

    bcrypt.hash(registerPassword, 10)
    .then(hashedPassword => {
        return UserModel.create({ fullName, userName, password: hashedPassword })
    })
    .then(user => res.json({ 
        message: "Success", 
        user: { fullName: user.fullName, userName: user.userName } 
    }))
    .catch(err => res.json(err))
}

const loginUser = (req, res) => {
    const { userName, registerPassword } = req.body

    UserModel.findOne({ userName: userName })
    .then(user => {
        if (!user) return res.json("User does not exist")

        return bcrypt.compare(registerPassword, user.password)
        .then(isMatch => {
            if (!isMatch) return res.json("Incorrect password")

            const token = jwt.sign(
                { userId: user._id },       // ← fixed: lowercase userId
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            )

            // only ONE res.json() here!
            res.json({
                message: "Success",
                token: token,
                user: {
                    fullName: user.fullName,
                    userName: user.userName
                }
            })
        })
    })
    .catch(err => res.json(err))
}

module.exports = { registerUser, loginUser }