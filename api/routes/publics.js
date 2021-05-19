const express = require("express");
const router = express.Router();

const publics = require('../controllers/publics.js')

router.get("/live" , publics.getLiveResult) 
router.get("/old" , publics.getOldResult) 
router.get("/elections" , publics.getAllElection)
router.get("/result/:electionId" , publics.getResult)

module.exports = router;