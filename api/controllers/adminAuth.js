var moment = require('moment');

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const validated = require("../helpers/validate.js")
const Admin = require("../models/admin");
const transport = require("../helpers/emailhelper")
const helper = require("../helpers/helper")

const jwtKey = process.env.JWT_KEY


exports.getProfile = async (req, res) => {
    try {
        const profile = await Admin.findById(req.user.user_id).select('_id name email');
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

exports.registerAdmin = async (req, res) => {
    const newAdmin = req.body;

    var admin;

    var validate = false;

    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
        res.status(400).json({ error: "Please provide the details" });
    }
    else {
        if (validated.validateEmail(newAdmin.email)) {
            if (validated.validatePassword(newAdmin.password)) {
                validate = true
            }
            else {
                res.status(400).json({ error: "Password should contain at least 8 characters including a character , number and a special character." })
            }
        }
        else {
            res.status(400).json({ error: "Please provide valid email" })
        }
    }

    if (validate) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newAdmin.password, salt)

        const adCount  =  await Admin.find({})

        if(adCount.length > 1)
        {
            admin = new Admin({
                name: newAdmin.name,
                email: newAdmin.email,
                password: hashedPassword,
                is_verified: false
            })
        }
        else
        {
            admin = new Admin({
                name: newAdmin.name,
                email: newAdmin.email,
                password: hashedPassword,
                is_verified: true
            })
        }

        admin
            .save()
            .then(result => {
                res.status(201).json({
                    message: "Admin Registerd Succesfully",
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
    }

}

exports.adminLogin = async (req, res) => {
    const cred = req.body
    var token = ''

    if (!cred.email || !cred.password) {
        res.status(400).json({ error: "Please provide the credentials" })
    }
    else {
        try {
            const user = await Admin.find({ 'email': cred.email })

            if (user.length > 0) {
                const compPass = await bcrypt.compare(req.body.password, user[0].password)


                if (compPass) {
                    const user_id = user[0]._id;
                    token = jwt.sign({ user_id }, jwtKey, {
                        algorithm: "HS256",
                        expiresIn: "1h"
                    })

                    res.status(200).json({ "message": "Logged in", "name": user[0].name, "id": user[0]._id, "token": token })
                }
                else {
                    res.status(400).json({ error: "Enter valid credentials" })
                }
            }
            else {
                res.status(400).json({ error: "Enter valid credentials" })
            }
        } catch (err) {
            res.status(500).status({ error: err.message })
        }
    }
}

exports.changePassword = async (req, res) => {

    try {
        const user = await Admin.findById(req.user.user_id)

        console.log(user)

        const compPass = await bcrypt.compare(req.body.oldpassword, user.password)

        if (compPass) {
            if (req.body.password1 === req.body.password2) {
                if (validated.validatePassword(req.body.password1)) {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(req.body.password1, salt)

                    const adminPass = await Admin.updateOne({ _id: req.user.user_id }, { password: hashedPassword })
                    res.status(200).json({ message: "Password changed successfully", admin: adminPass })
                }
                else {
                    res.status(400).json({ error: "Password should contain at least 8 characters including a character , number and a special character." })
                }
            }
            else {
                res.status(400).json({ error: "New Password Dosen't Match" })
            }
        }
        else {
            res.status(400).json({ error: "Enter valid credentials" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.forgotPassword = async (req, res) => {
    const email = req.body.email

    try {
        const user = await Admin.find({ email: email })
        console.log(user)
        if (user.length > 0) {
            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            const random = randomIntFromInterval(10001, 99998)

            const admin = {
                otp: random,
                otp_time: Date.now()
            }

            const updateAdmin = await Admin.updateOne({ _id: user[0]._id }, admin)

            const message = {
                from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                to: 'alphonseksebastian1@gmail.com',         // List of recipients
                subject: 'OTP for Changing Password', // Subject line
                html: `Use <h1>${random}</h1> to change your password.` // Plain text body
            };
            transport.getSmpt().sendMail(message, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info);
                }
            });

            res.status(200).json({ "message": "OTP sent successfully", updateAdmin })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.changeFpassword = async (req, res) => {
    const otp = req.body

    try {
        const getUserByOtp = await Admin.find({ otp: otp.otp })
        console.log(getUserByOtp)
        if (getUserByOtp.length > 0) {
            if (!helper.otpLessThanTenMinute(getUserByOtp[0].otp_time)) {
                if (otp.firstpass == otp.secondpass) {
                    if (validated.validatePassword(otp.firstpass)) {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(otp.firstpass, salt)

                        data = {
                            password: hashedPassword,
                            otp: ''
                        }

                        const updateAdmin = await Admin.updateOne({ _id: getUserByOtp[0]._id }, data)
                        const message = {
                            from: 't.e.s.t.a.a.p.p.p@gmail.com', // Sender address
                            to: 'alphonseksebastian1@gmail.com',         // List of recipients
                            subject: 'Updated Password', // Subject line
                            html: `Your Password has been successfully updated.` // Plain text body
                        };
                        transport.getSmpt().sendMail(message, function (err, info) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(info);
                            }
                        });

                        res.status(200).json({ "message": "Password Changed Succesfully"})
                    }
                    else {
                        res.status(400).json({ error: "Password should contain atlest a number , a special character and alphabets with atlest 8 characters" })
                    }
                }
                else{
                    res.status(400).json({ error: "Password didn't match"})
                }
            }
            else {
                res.status(400).json({ error: "OTP time expierd" })
            }
        }
        else{
            // if otp not found
            res.status(404).json({ error:"OTP not found"})
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}