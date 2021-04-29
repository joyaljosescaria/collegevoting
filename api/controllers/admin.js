var moment = require('moment');
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Candidate = require("../models/candidate");
const Student = require("../models/student");
const Election = require("../models/election");
const Course = require("../models/course");
const Position = require("../models/electionPosition");
const StudentPosition = require("../models/studentPosition");

const transport = require("../helpers/emailhelper")

// Get all students 
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({ is_active: true }, 'name is_verified course_id profile_pic batch_year_count _id').populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({ students })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get a Student

exports.getaStudent = async (req, res) => {
    try {
        const student = await Student.findById({ _id: req.params.studentId }).populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({ student })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get all unverified students
exports.getUnverified = async (req, res) => {
    try {
        const unverified = await Student.find({ is_verified: false , is_active: true }).populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({ unverified })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get student verified
exports.verifyStudent = async (req, res) => {
    const student = req.params.studentId
    var pos = []
    try {

        const findStudent = await Student.find({ _id: student })
        if (findStudent.length > 0) {
            data = {
                is_verified: true
            }

            const verifyStudent = await Student.updateOne({ _id: student }, data)

            var positions = [];

            const getAll = await Course.find({ course: "All" })

            const getPos1 = await Position.find({ batch_year_count: 0, course_id: getAll[0]._id })
            getPos1.map(pos => positions.push({ "id": pos._id, "electionId": pos.election_id }))
            const getPos2 = await Position.find({ batch_year_count: req.body.batch_year_count })
            getPos2.map(pos => positions.push({ "id": pos._id, "electionId": pos.election_id }))
            const getPos3 = await Position.find({ course_id: req.params.course_id })
            getPos3.map(pos => positions.push({ "id": pos._id, "electionId": pos.election_id }))

            if (positions.length > 0) {
                positions.map(posi => {
                    var sobj = {};
                    sobj['student_id'] = req.body.student_id,
                    sobj['position_id'] = posi.id,
                    sobj['election_id'] = posi.electionId
                    pos.push(sobj)
                })

                const insertPosition = await StudentPosition.insertMany(pos)
            }

            res.status(200).json({ message: "Student Verified" })

            const message = {
                from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                to: findStudent[0].email,         // List of recipients
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
                to: findStudent[0].email,         // List of recipients
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

        const getAllCourse = await Course.find({ is_active: true })
        res.status(200).json({ getAllCourse })

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
        res.status(200).json({ getAllElection })

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

        const updatePosition = await Election.updateOne({ _id: req.body.electionId }, { "$push": { "positions": saveNewPosition._id } })

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
                sobj['election_id'] = req.body.electionId
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
                sobj['election_id'] = req.body.electionId
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
        const positions = await Position.find({ election_id: req.params.electionId }).populate({ path: "course_id", select: "_id course" }).lean();
        res.status(200).json({ positions })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Election Position 

exports.deleteElectionPositions = async (req, res) => {
    try {
        const findElection = await Election.findOne({ _id: req.params.electionId })
        const deleteElectionPos = await findElection.positions.remove(req.params.positionId)
        const updatePos = await findElection.save()
        console.log(deleteElectionPos)
        const deleteStudentPositions = await StudentPosition.deleteMany({ position_id: req.params.positionId })
        const deleteCandidate = await Candidate.deleteMany({ position_id: req.params.positionId })
        const deletePosition = await Position.deleteOne({ _id: req.params.positionId })

        res.status(200).json({ message: "Position deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Get all Candidates

exports.getAllCandidates = async (req, res) => {
    try {
        const findCandidates = await Candidate.find({ election_id: req.params.electionId }).populate({ path: "position_id", select: "_id position" }).populate({ path: "student_id", select: "_id name profile_pic" }).lean();
        res.status(200).json({ findCandidates })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Verify candidate

exports.acceptCandidates = async (req, res) => {
    try {

        candidate = {
            is_verified: true
        }

        const acceptCandidate = await Candidate.updateOne({ _id: req.params.candidateId }, candidate);
        res.status(200).json({ acceptCandidate })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Deverify Candidate

exports.rejectCandidates = async (req, res) => {
    try {

        candidate = {
            is_verified: false,
            rejected: true
        }

        const getEmail = await Candidate.find({ _id: req.params.candidateId }).populate({ path: "student_id", select: "_id email" })
        const acceptCandidate = await Candidate.updateOne({ _id: req.params.candidateId }, candidate);

        const email = getEmail[0].student_id.email

        const message = {
            from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: 'Rejected Nomination', // Subject line
            html: `Your nomination has been rejected .` // Plain text body
        };
        transport.getSmpt().sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
                
            }
        })

        res.status(200).json({ acceptCandidate })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// get a candidate

exports.getACandidate = async (req, res) => {
    try {
        const findCandidate = await Candidate.find({ _id: req.params.candidateId }).populate({ path: "position_id", select: "_id position" }).populate({ path: "student_id", select: "_id name profile_pic had_candidate", populate: { path: 'course_id', select: 'course' } }).lean();
        res.status(200).json({ findCandidate })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Start Election

exports.startElection = async (req, res) => {
    try {

        const getElection = await Election.findById(req.params.electionId, 'started')

        election = {
            started: !getElection.started
        }

        const startElection = await Election.updateOne({ _id: req.params.electionId }, election);

        res.status(200).json(startElection)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Student

exports.deleteStudent = async (req, res) => {
    try {
        data = {
            is_active: false
        }

        const deleteStudent = await Student.updateOne({ _id: req.params.studentId }, data)
        res.status(200).json({ deleteStudent })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update Batch 

exports.updateBatch = async (req, res) => {
    try {
        const deleteElection = await Election.deleteMany({})
        const deleteElectionPos = await Position.deleteMany({})
        const deleteStdPos = await StudentPosition.deleteMany({})
        const deleteCandidate = await Candidate.deleteMany({})

        const updateBatch = await Student.updateMany({ batch_year_count: 1 }, { batch_year_count: 2 });
        const updateBatch1 = await Student.updateMany({ batch_year_count: 2 }, { batch_year_count: 3 });
        const updateBatch2 = await Student.updateMany({ batch_year_count: 3 }, { batch_year_count: 4 });

        const deleteBatch = await Student.updateMany({ batch_year_count: 4 }, { is_active: false });

        res.status(200).json({ message: "Batch Updated" })

    } catch (err) {

    }
}

