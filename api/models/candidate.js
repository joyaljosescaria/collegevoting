const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    election_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    position_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    result_pdf: { type: String },
    is_verified: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    votes: { type: Number, default: 0 }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Candidate', candidateSchema);