var moment = require('moment');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const validated = require("../helpers/validate.js")
const helper = require("../helpers/helper")

const Admin = require("../models/admin");
const Candidate = require("../models/candidate");
const Student = require("../models/student");
const Election = require("../models/election");
const Course = require("../models/course");
const Position = require("../models/electionPosition");
const StudentPosition = require("../models/studentPosition");

const transport = require("../helpers/emailhelper");
const { rawListeners } = require('../models/admin');


// Get the profile of student 
exports.getStudent = async (req, res) => {
    try {
        const getStudent = await Student.findById(req.user.user_id).select('is_verified name course_id batch_year_count unique_id email profile_pic').populate({ path: 'course_id', select: 'course' })
        res.status(200).json({ getStudent })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Register Student 
exports.registerStudent = async (req, res) => {
    const newStudent = req.body
    var validate = false;
    var id_card = '';
    var id_card_s = '';
    var profile_pic = ''

    try {
        if (!newStudent.name || !newStudent.email || !newStudent.course_id || !newStudent.batch_year_count || !newStudent.profile_pic || !newStudent.id_card || !newStudent.id_card_selfi) {
            res.status(400).json({ error: "Please provide the details" });
        }

        if (validate.validateEmail(newStudent.email)) {
            validate = true;
        }
        else {
            res.status(400).json({ error: "Please provide a valid email address" })
        }

        if (validate) {

        }


    } catch (err) {

    }
}

// Submit Nomination

exports.nomination = async (req, res) => {
    try {
        const nomination = {
            student_id: req.user.user_id,
            position_id: req.body.position,
            election_id: req.body.election
        }
        const saveNomination = await nomination.save()
        res.status(200).json({ saveNomination })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// login

exports.studentlogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.unique_id) {
            res.status(400).json({ error: "Please provide the credentials" })
        }
        const login = await email.find({ email: req.body.email}).select(' email unique_id')
        if(login[0].email===req.body.email){
            if(login[0].unique_id ===req.body.unique_id)
            {
                const password = helper.generatePassword(8)

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const message = {
                    from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                    to: login[0].email,         // List of recipients
                    subject: 'Password for Login', // Subject line
                    html: `Use <h1>${password}</h1> to login.` // Plain text body
                };
                transport.getSmpt().sendMail(message, function (err, info) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(info);
                    }
                });

                const data = {
                    password: hashedPassword,
                    pass_added_time: Date.now()
                }

                const saveLogin = await data.save()

                res.status(200).json({ message:"Password sent successfully"})
            }
        }
        else
        {
            res.status(403).json({ error: "provide correct credentials"})
        }

        

    } catch (error) {
        res.status(400).json({ error: err.message })
    }
}