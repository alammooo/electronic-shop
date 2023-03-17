const bcrypt = require("bcryptjs")

function encPassword(password) {
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

function compPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { encPassword, compPassword }
