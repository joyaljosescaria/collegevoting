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

const jwtKey = process.env.JWT_KEY


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
    const newFile = req.files
    var validate = false;

    try {
        if (!newStudent.name || !newStudent.email || !newStudent.course_id || !newStudent.batch_year_count || !newFile.profile_pic || !newFile.id_card || !newFile.id_card_selfi) {
            res.status(400).json({ error: "Please provide the details" });
        }

        if (validated.validateEmail(newStudent.email)) {
            validate = true;
        }
        else {
            res.status(400).json({ error: "Please provide a valid email address" })
        }

        if (validate) {
            var profile_pic = newFile.profile_pic;
            var id_card = newFile.id_card;
            var id_card_s = await newFile.id_card_selfi;

            console.log(id_card_s)

            profile_pic.mv('./uploads/profilepic' + profile_pic.name);
            id_card.mv('./uploads/idcard' + id_card.name);
            id_card_s.mv('./uploads/selfi' + id_card_s.name);

            function randomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            const unique_id = randomNumber(100001, 999999)


            var student = new Student({
                profile_pic: profile_pic.name,
                id_card: id_card.name,
                id_card_selfi: id_card_s.name,
                name: newStudent.name,
                course_id: newStudent.course_id,
                unique_id: unique_id.toString(),
                batch_year_count: newStudent.batch_year_count,
                email: newStudent.email,
            })


            student
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "Student Registerd Succesfully",
                        admin: {
                            name: result.name,
                            email: result.email,
                            _id: result._id,
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err.message
                    });
                });

            const message = {
                from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                to: newStudent.email,         // List of recipients
                subject: 'Account Created', // Subject line
                html: `${newStudent.name} , your account has been created. Here is your unique ID ${unique_id}.` // Plain text body
            };
            transport.getSmpt().sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });
        }


    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Submit Nomination

exports.nomination = async (req, res) => {
    try {
        const getStudent = await Student.findById(req.user.user_id).select('had_candidate ')
        if (getStudent.had_candidate) {
            res.status(500).json({ error: 'You have been participated once .' })
        }
        else {
            const nomination = new Candidate({
                student_id: req.user.user_id,
                position_id: req.body.position,
                election_id: req.body.election
            })

            data = {
                had_candidate: true,
            }
            const saveNomination = await nomination.save()
            const update = await Student.updateOne({ _id: req.user.user_id }, data)
            res.status(200).json({ saveNomination })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// login

exports.studentLogin1 = async (req, res) => {
    try {
        if (!req.body.email || !req.body.unique_id) {
            res.status(400).json({ error: "Please provide the credentials" })
        }
        const login = await Student.find({ unique_id: req.body.unique_id }).select(' email unique_id is_active is_verified')

        if(!login[0].is_active && !login[0].is_verified) {
            res.status(403).json({ error:"You can't login ."})
        }

        if (login[0].email === req.body.email) {
            if (login[0].unique_id === req.body.unique_id) {
                const password = helper.generatePassword(8)

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const message = {
                    from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                    to: login[0].email,         // List of recipients
                    subject: 'Password for Login', // Subject line
                    html: `Use <h1>${password}</h1> to login. Password is only valid for 10 minutes.` // Plain text body
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

                const saveLogin = await Student.updateOne({ unique_id: login[0].unique_id }, data)

                res.status(200).json({ message: "Password sent successfully" })
            }
        }
        else {
            res.status(403).json({ error: "provide correct credentials" })
        }

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Student Loging 2

exports.studentLogin2 = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ error: "Please provide the credentials" })
        }

        const getStudent = await Student.find({ unique_id: req.body.unique_id }).select('email password pass_added_time')
        console.log(getStudent)

        if (!helper.otpLessThanTenMinute(getStudent[0].pass_added_time)) {

            if (getStudent[0].email === req.body.email) {
                if (compPass = await bcrypt.compare(req.body.password, getStudent[0].password)) {
                    const user_id = getStudent[0]._id;
                    token = jwt.sign({ user_id }, jwtKey, {
                        algorithm: "HS256",
                        expiresIn: "24h"
                    })
                    res.status(200).json({ token: token, _id: getStudent[0]._id })
                }
                else {
                    res.status(404).json({ error: "Not Found" })
                }
            }
            else {
                res.status(404).json({ error: "Not Found" })
            }
        }
        else {
            res.status(403).json({ error: "OTP Expired" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// cast vote

exports.castVote = async (req, res) => {
    var posi = new Array()
    var posi1 = new Array()

    try {
        const anyElection = await Election.find({ started: true })
        if (anyElection.length > 0) {
            var elections = []
            anyElection.map(e => {
                elections.push(e._id)
            })


            for(let i=0; i<elections.length ; i++) {
                const position = await StudentPosition.find({ election_id: elections[i], student_id: req.user.user_id })
                position.map(pos => {
                    posi.push(pos.position_id)
                })
                posi1 = posi
                console.log(posi)
            }


            var candidates = {}

            posi.map(async (position , index) => {
                console.log(position)
                var candidate = await Candidate.find({ position_id: position }).populate({ path: 'student_id', select: 'name' }).populate({ path: 'course_id', select: 'course' }).populate({ path: 'election_id', select: 'election' })
                candidate.map(c => {
                    console.log(c)
                    candidates["pos"+index] : [
                        {
                            "name":"Joyal"
                        }
                    ]
                })
            })

            res.status(200).json({ candidates })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}