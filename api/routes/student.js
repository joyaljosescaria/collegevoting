const student = require('../controllers/student.js')

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateUser.js")

router.get('/profile' , auth , student.getStudent) //Get student profile
router.post('/nomination', auth, student.nomination) //add nomination
router.post('/register' , student.registerStudent) //register
router.post('/loginpre' , student.studentLogin1) //Login 1
router.post('/login' , student.studentLogin2) //Login 2
router.get('/cast' , auth, student.castVote) //Cast vote
router.get('/course' , student.getCourse) //Cast vote
router.get('/position' , auth, student.getPositions) //Cast position
router.get('/election' , auth, student.getElection) //Cast election
router.put('/addvotes/:studentId/:positionId' , auth , student.addVote) //Add vote
router.put('/upload/:uniqueId' , student.uploadSelfi) //upload selfi

module.exports = router;