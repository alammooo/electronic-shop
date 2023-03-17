const multer = require("multer")

function errorHandler(error, req, res, next) {
  // console.log(error)

  if (error.name === "SequelizeValidationError") {
    res.status(400).json({ message: error.errors[0]?.message })
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: error.errors[0]?.message })
  }
  if (error.name === "notFound") {
    res.status(404).json({ message: "Item not found" })
  }
  if (error.name === "invalidFile") {
    res.status(400).json({ message: "Invalid file type" })
  }
  if (error instanceof multer.MulterError) {
    res.status(400).json({ message: "Invalid file type or size" })
  }
  if (error.name === "SequelizeDatabaseError") {
    res.status(400).json({ message: "Invalid input" })
  }
  if (error.name === "invalid token") {
    res.status(401).json({ message: "Invalid token" })
  }
  if (error.name === "invalidUser") {
    res.status(401).json({ message: "Invalid username or password" })
  }
  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" })
  }
  if (error.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token expired" })
  }
}

module.exports = errorHandler
