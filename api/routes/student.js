const student = require('../controllers/student.js')

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateUser.js")

router.get('/profile' , auth , student.getStudent) //Get student profile
router.post('/nomination', auth, student.nomination) //add nomination
router.post('/register' , student.registerStudent) //register
router.post('/loginpre' , student.studentLogin1) //Login 1
router.post('/login' , student.studentLogin2) //Login 2
router.put('/cast' , auth, student.castVote) //Cast vote
router.get('/course' , auth, student.getCourse) //Cast vote
router.get('/position' , auth, student.getPositions) //Cast position
router.get('/election' , auth, student.getElection) //Cast election

module.exports = router;