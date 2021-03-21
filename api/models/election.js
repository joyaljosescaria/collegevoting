const mongoose = require('mongoose');

const electionSchema = mongoose.Schema({
    election: { type: String , required: true },
    date: { type: Date, required: true},
    started : { type : Boolean , required: true , default: false},
    positions: [{ type: mongoose.Schema.Types.ObjectId , ref:'Position'}]
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Election', electionSchema);