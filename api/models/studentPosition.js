const mongoose = require('mongoose');

const studentPositionSchema = mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    position_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' , required: true},
    election_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' , required: true},
    isVoted: { type: Boolean , required: true , default: false }
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('StudentPosition', studentPositionSchema);