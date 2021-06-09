const admin = require('../controllers/admin.js')

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateUser.js")
const isAdmin = require("../middlewares/isAdmin.js")

// Students 
router.get('/students', auth, isAdmin, admin.getAllStudents) // GET all students ✅
router.get('/unverified', auth, isAdmin, admin.getUnverified) // Get all unverified students ✅
router.get('/student/:studentId', auth, isAdmin, admin.getaStudent) // GET a student ✅

// Student Verification
router.put('/verifystudent/:studentId', auth, isAdmin, admin.verifyStudent) // Verify a student ✅
router.put('/unverifystudent/:studentId', auth, isAdmin, admin.unVerifyStudent) // Verify a student ✅

// Course 
router.get('/courses/', auth, isAdmin, admin.getAllCourse) //Get all courses ✅
router.get('/courses1/', auth, isAdmin, admin.getAllCourses1) //Get all courses ✅
router.put('/courses/:courseId', auth, isAdmin, admin.editCourse) //Edit course ✅
router.post('/courses', auth, isAdmin, admin.createCourse) //Create course ✅
router.delete('/courses/:courseId', auth, isAdmin, admin.deleteCourse) //Delete course ✅

// Election
router.get('/elections', auth, isAdmin, admin.getAllElection) //Get all election ✅
router.post('/elections', auth, isAdmin, admin.createElection) //Create election ✅
router.get('/elections/:electionId', auth, isAdmin, admin.getElection) //Get an election ✅
router.put('/elections/:electionId', auth, isAdmin, admin.editElection) //Edit elections ✅
router.delete('/elections/:electionId', auth, isAdmin, admin.deleteElection) //Delete Election ✅
router.put('/election/start/:electionId', auth, isAdmin, admin.startElection) //Start an election 
router.put('/election/nomination/:electionId', auth, isAdmin, admin.toggleNomination) //Toggle nomination

// Election Positions
router.get('/election/position/:electionId', auth, isAdmin, admin.getAllPositions) //Get all positions ✅
router.post('/election/position', auth, isAdmin, admin.createElectionPosition) //Create election positions ✅
router.put('/election/position/:positionId', auth, isAdmin, admin.editElectionPosition) //Edit election positions ✅
router.delete('/election/position/:positionId/:electionId', auth, isAdmin, admin.deleteElectionPositions) //Delete election position ✅

// Candidates
router.get('/candidates/:electionId', auth, isAdmin, admin.getAllCandidates) //Get all candidates ✅
router.get('/candidate/:candidateId', auth, isAdmin, admin.getACandidate) //Get a candidate
router.put('/candidate/accept/:candidateId', auth, isAdmin, admin.acceptCandidates) //Verify candidate
router.put('/candidate/reject/:candidateId', auth, isAdmin, admin.rejectCandidates) //Reject candidate

// Delete Student
router.delete('/student/delete/:studentId', auth, isAdmin, admin.deleteStudent) //Delete Student

// Update Batch and Delete Batch 
router.put('/student/updatebatch', auth, isAdmin, admin.updateBatch) //Update Batch

// Suppli Count 
router.get('/student/views/:studentId', auth, isAdmin, admin.getSuppliCount) //Get the count of suppli
router.put('/student/updates/:studentId', auth, isAdmin, admin.editSuppliCount) //Update the count of suppli

module.exports = router;
