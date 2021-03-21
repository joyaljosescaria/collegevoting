const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    election_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    position_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ElectionPositions' , required: true},
    votes: { type: Number , default:0}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Candidate', candidateSchema);