var moment = require('moment');
const mongoose = require("mongoose");
const Admin = require("../models/admin");
const Candidate = require("../models/candidate");
const Student = require("../models/student");
const Election = require("../models/election");
const Course = require("../models/course");
const Position = require("../models/electionPosition");
const StudentPosition = require("../models/studentPosition");

exports.getLiveResult = async (req, res) => {
    var posi = []
    var candidate = []
    var cand = {}

    try {
        const getLiveElection = await Election.find({ started: true})
        if(getLiveElection.length  > 0)
        {
            getLiveElection.map((ele , index) => {
                ele.positions.map((pos , index) => {
                    posi.push(pos)
                })
            })

            for(let k= 0 ; k <posi.length ; k++) {
                var candi = await Candidate.find({ position_id: posi[k]   }).populate({ path: 'student_id', select: 'name profile_pic' }).populate({ path: 'position_id', select: 'position' }).populate({ path: 'election_id', select: 'election' })
                cand[k] = []
                for (let i = 0; i < candi.length; i++) {
                    cand[k].push(candi[i])
                }
                candidate.push(cand[k])
                console.log(cand[k])
            }

            res.status(200).json({candidate})
        }
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

exports.getOldResult = async (req, res) => {
    var posi = []
    var candidate1 = []
    var cand = {}

    try {
        
        const getLiveElection = await Election.find({ started: false})
        if(getLiveElection.length  > 0)
        {
            getLiveElection.forEach((ele , index) => {
                ele.positions.map((pos , index) => {
                    posi.push(pos)
                })
            })

            for(let k= 0 ; k <posi.length ; k++) {
                var candi = await Candidate.find({ position_id: posi[k]  , rejected:false }).populate({ path: 'student_id', select: 'name profile_pic' }).populate({ path: 'position_id', select: 'position' }).populate({ path: 'election_id', select: 'election started' }).sort({created_at: -1})
                cand[k] = []
                for (let i = 0; i < candi.length; i++) {
                    cand[k].push(candi[i])
                }
                candidate1.push(cand[k])
                console.log(cand[k])
            }

            res.status(200).json({candidate1})
        }
        res.status(404).json({ error : "No election"})
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

exports.getAllElection = async (req, res) => {
    try {
        const getAllElection = await Election.find({})
        res.status(200).json({getAllElection})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getResult = async (req, res) => {
    var posi = [] 
    var candidate = []
    // var cand = {}

    try {
        const getElection = await Election.find({_id: req.params.electionId})
        if(getElection.length > 0) 
        {
            getElection.map(ele => {
                ele.positions.map((pos) => {
                    posi.push(pos)
                })
            })
        }

        for(let k= 0 ; k <posi.length ; k++) 
        {
            var candi = await Candidate.find({ position_id: posi[k] , rejected:false}).populate({ path: 'student_id' , select: 'name profile_pic' }).populate({ path: 'position_id', select: 'position'}).populate({ path: 'election_id', select: 'election' }).sort('created_at')
            cand[k] = []
            for (let i = 0; i < candi.length; i++) {
                cand[k].push(candi[i])
            }
            candidate.push(cand[k])
        }
        res.status(200).json({candidate})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getVotePercentage = async (req, res) => {
    try {
        const election = await Election.find({started: true} , '_id')
        if(election.length > 0)
        {
            const totalVote = await StudentPosition.countDocuments({election_id: election[0]._id})
            const voted = await StudentPosition.countDocuments({isVoted:true , election_id: election[0]._id})
            const per = Number(voted)/Number(totalVote)*100
            const roundPer = per.toFixed(2)
            res.status(200).json({roundPer , "started":true})    
        }
        else {
            res.status(200).json({"started":false})
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}