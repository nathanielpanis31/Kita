const UserModel = require('../models/user')

const registerUser = (req, res) => {
    const { fullName, userName, registerPassword } = req.body

    UserModel.create({ fullName, userName, password: registerPassword })
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

const loginUser = (req, res) => {
    const { userName, registerPassword } = req.body

    UserModel.findOne({ userName: userName })
    .then(user => {
        if (user) {
            if (user.password === registerPassword) {
                res.json("Success")
            } else {
                res.json("Incorrect password")
            }
        } else {
            res.json("User dont exist")
        }
    })
}

module.exports = { registerUser, loginUser }