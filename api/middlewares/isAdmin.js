const auth = require("./authenticateUser.js")
const Admin = require("../models/admin")

const isAdmin = async (req, res, next) =>{

    try {
        const admin = await Admin.find({ _id: req.user.user_id})
        
        if(admin)
        {
            next()
        }
        else{
            res.status(403).json("Access Denied")
        }
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

module.exports = [
    isAdmin,
]