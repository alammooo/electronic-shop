const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    console.log(file)
    const fileArr = file.mimetype.split("/")
    const fileExt = fileArr[fileArr.length - 1]
    cb(null, file.fieldname + "-" + Date.now())
  },
})

// const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  // dest: join(__dirname, "..", "uploads"),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true)
    } else {
      cb({ name: "invalidFile" })
    }
  },
  onError: (error, next) => {
    next(error)
  },
  limits: { fileSize: 100000 },
})

module.exports = { upload, storage }
