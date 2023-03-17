const Controller = require("../controllers/controller")
const { authentication } = require("../middlewares/authentication")
const { upload } = require("../middlewares/multer")
const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.get("/items", Controller.getItems)
router.get("/items/:id", Controller.getItemById)
// router.use(authentication)
router.post("/items", upload.single("image"), Controller.postItem)
router.delete("/items/:id", Controller.deleteItem)
router.put("/items/:id", upload.single("image"), Controller.updateItem)

module.exports = router
