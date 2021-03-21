const adminAuth = require('../controllers/adminAuth.js')

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateUser.js")

router.get('/profile' , auth , adminAuth.getProfile) // GET admin profile
router.post("/register" , adminAuth.registerAdmin) // Register Admin
router.post("/login" , adminAuth.adminLogin) // Login Admin
router.put("/changepassword" , auth , adminAuth.changePassword) // Change Password Admin
router.put('/forgotpassword' , adminAuth.forgotPassword) // Forgot Password Admin
router.put('/changefpassword' , adminAuth.changeFpassword) // Change Forgot Password Admin


module.exports = router;