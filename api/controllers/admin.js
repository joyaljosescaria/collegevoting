var moment = require('moment');
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Student = require("../models/student");
const Election = require("../models/election");
const Course = require("../models/course");
const Position = require("../models/electionPosition");
const StudentPosition = require("../models/studentPosition");

const transport = require("../helpers/emailhelper")

// Get all students 
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({is_active:true} , 'name is_verified course_id profile_pic batch_year_count _id').populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({students})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get a Student

exports.getaStudent = async (req, res) => {
    try {
        const student = await Student.findById({_id:req.params.studentId}).populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({student})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get all unverified students
exports.getUnverified = async (req, res) => {
    try {
        const unverified = await Student.find({ is_verified: false }).populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({unverified})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get student verified
exports.verifyStudent = async (req, res) => {
    const student = req.params.studentId
    
    try {

        const findStudent = await Student.find({ _id: student })
        if (findStudent.length > 0) {
            data = {
                is_verified: true
            }

            const verifyStudent = await Student.updateOne({ _id: student }, data)

            res.status(200).json({ message: "Student Verified" })

            const message = {
                from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                to: 'alphonseksebastian1@gmail.com',         // List of recipients
                subject: 'Verification Completed', // Subject line
                html: `${findStudent[0].name} your profile has been verified. Your unique ID is ${findStudent[0].unique_id}.` // Plain text body
            };
            transport.getSmpt().sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });

        }
        else
            res.status(404).json({ error: "student not found" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Call not verified if student details is incorrect or want to unverify after false verification

exports.unVerifyStudent = async (req, res) => {
    const student = req.params.studentId
    const reason = req.body.reason

    try {

        const findStudent = await Student.find({ _id: student })
        if (findStudent.length > 0) {
            data = {
                is_verified: false,
                not_verify_reason: reason
            }

            const unVerifyStudent = await Student.updateOne({ _id: student }, data)
            console.log(await Student.find({ _id: student }))

            const message = {
                from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                to: 'alphonseksebastian1@gmail.com',         // List of recipients
                subject: 'Profile Unverified', // Subject line
                html: `${findStudent[0].name} your profile has an error. Please verify and try again. Reason : ${reason} .` // Plain text body
            };
            transport.getSmpt().sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });

            res.status(200).json({ message: "Student Unverified" })
        }
        else
            res.status(404).json({ message: "student not found" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Add coursse 
exports.createCourse = async (req, res) => {
    try {

        const course = new Course({
            course: req.body.course,
        })

        const svaeCourse = await course.save()
        res.status(201).json({ message: "Course Created" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Edit Course 

exports.editCourse = async (req, res) => {
    try {

        const course = {
            course: req.body.course
        }

        const editCourse = await Course.updateOne({ _id: req.params.courseId }, course)
        res.status(200).json({ message: "Course updated" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const course = {
            is_active: false
        }

        const removeCourse = await Course.updateOne({ _id: req.params.courseId }, course)

        res.status(200).json({ message: "Course deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get all Course
exports.getAllCourse = async (req, res) => {
    try {

        const getAllCourse = await Course.find({is_active:true})
        res.status(200).json({getAllCourse})

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Create Election
exports.createElection = async (req, res) => {
    try {
        const election = new Election({
            election: req.body.election,
            date: req.body.date
        })

        const createElection = await election.save()
        res.status(200).json({ message: "Election created" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Edit Election
exports.editElection = async (req, res) => {
    try {
        const election = {
            election: req.body.election,
            date: req.body.date
        }

        const editElection = await Election.updateOne({ _id: req.params.electionId }, election)
        res.status(200).json({ message: "Election updated" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Election
exports.deleteElection = async (req, res) => {
    try {

        const removeEelection = await Election.deleteOne({ _id: req.params.electionId })
        const removePosition = await Position.deleteMany({ election_id: req.params.electionId })
        res.status(200).json({ message: "Election removed" })

    } catch (err) {
        res.status(500).json({ error: err.err.message })
    }
}

//Get all election
exports.getAllElection = async (req, res) => {
    try {

        const getAllElection = await Election.find({}).populate('Position')
        res.status(200).json(getAllElection)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get an election
exports.getElection = async (req, res) => {
    try {

        const getElection = await Election.find({ _id: req.params.electionId }).populate('Position')
        if (getElection.length > 0)
            res.status(200).json(getElection)
        else
            res.status(404).json({ message: "Election not found" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Create Election Position
exports.createElectionPosition = async (req, res) => {
    var getValidStudents
    var students = []

    try {

        const newPosition = new Position({
            position: req.body.position,
            batch_year_count: req.body.batch_year_count,
            course_id: req.body.course_id,
            election_id: req.body.electionId
        })

        const saveNewPosition = await newPosition.save()

        const updatePosition = await Election.updateOne({ _id: req.body.electionId },{ "$push": { "positions": saveNewPosition._id } })

        const getCourseId = await Course.findOne({ 'course': 'All' })

        // Get all the students who can vote for this position and place in Student Position
        if (req.body.batch_year_count == 0 && req.body.course_id == getCourseId._id) {
            getValidStudents = await Student.find({ is_active: true }).select('_id')
        }
        else if (req.body.batch_year_count == 0) {
            getValidStudents = await Student.find({ is_active: true, course_id: req.body.course_id }).select('_id')
        }
        else {
            getValidStudents = await Student.find({ is_active: true, batch_year_count: req.body.batch_year_count }).select('_id')
        }

        if (getValidStudents.length > 0) {
            getValidStudents.map(student => {
                var sobj = {};
                sobj['student_id'] = student._id
                sobj['position_id'] = saveNewPosition._id
                students.push(sobj)
            })

            const insertPosition = await StudentPosition.insertMany(students)
        }

        res.status(201).json({ message: "Position created" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Edit Election Position
exports.editElectionPosition = async (req, res) => {
    var getValidStudents
    var students = []

    try {

        const position = {
            position: req.body.position,
            batch_year_count: req.body.batch_year_count,
            course_id: req.body.course_id,
            election_id: req.body.electionId
        }

        const editPosition = await Position.updateOne({ _id: req.params.positionId }, position)
        const removeStudentPosition = await StudentPosition.deleteMany({ _id: req.params.positionId })
        const getCourseId = await Course.findOne({ 'course': 'All' })

        // Get all the students who can vote for this position and place in Student Position
        if (req.body.batch_year_count == 0 && req.body.course_id == getCourseId._id) {
            getValidStudents = await Student.find({ is_active: true }).select('_id')
        }
        else if (req.body.batch_year_count == 0) {
            getValidStudents = await Student.find({ is_active: true, course_id: req.body.course_id }).select('_id')
        }
        else {
            getValidStudents = await Student.find({ is_active: true, batch_year_count: req.body.batch_year_count }).select('_id')
        }

        if (getValidStudents.length > 0) {
            getValidStudents.map(student => {
                var sobj = {};
                sobj['student_id'] = student._id
                sobj['position_id'] = req.params.positionId
                students.push(sobj)
            })

            const insertPosition = await StudentPosition.insertMany(students)
        }

        res.status(200).json({ message: "Position updated" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get all election positions

exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find({}).populate({ path: "election_id", select: "_id election" }).lean();
        res.status(200).json(positions)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Election Position 

exports.deleteElectionPositions = async (req, res) => {
    try {
        const findElection = await Election.findOne({ _id: req.params.electionId})
        const deleteElectionPos = await findElection.positions.remove(req.params.positionId)
        const updatePos = await findElection.save()
        console.log(deleteElectionPos)
        const deleteStudentPositions = await StudentPosition.deleteMany({position_id: req.params.positionId})
        const deletePosition = await Position.deleteOne({ _id: req.params.positionId})

        res.status(200).json({ message: "Position deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}