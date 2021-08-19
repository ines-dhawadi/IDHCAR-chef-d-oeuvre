const express=require('express')
const router = express.Router()
const authController =require('../client/authController')
const userController =require('../client/userController')
const uploadController =require('../client/uploadController')
const multer = require('multer')
const upload = multer()

//  auth
router.post("/register",authController.signUp)
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);


// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id",userController.follow )
router.patch("/unfollow/:id",userController.unfollow )

// upload img

router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router