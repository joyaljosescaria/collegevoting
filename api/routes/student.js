const student = require('../controllers/student.js')

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateUser.js")

router.get('/profile' , auth , student.getStudent) //Get student profile
router.post('/nomination', auth, student.nomination) //add nomination


module.exports = router;