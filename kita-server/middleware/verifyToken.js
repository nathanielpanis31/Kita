const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // get the token from the request headers
    const token = req.headers['authorization']

    // if there's no token, block them
    if (!token) return res.json({ message: "No token provided" })

    // verify the token is real and not expired
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ message: "Invalid token" })

        // token is valid! save the userId so the next function can use it
        req.userId = decoded.userId

        // move on to the actual route function
        next()
    })
}

module.exports = verifyToken