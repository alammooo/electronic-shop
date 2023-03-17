const jwt = require("jsonwebtoken")
const keyless = "TESTKEY"

function generateToken(payload) {
    return jwt.sign(payload, keyless)
}

function verifyToken(token) {
    return jwt.verify(token, keyless)
}


module.exports = { generateToken, verifyToken }