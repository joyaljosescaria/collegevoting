const mongoose = require('mongoose');

const electionPositionSchema = mongoose.Schema({
    position : { type: String, required: true},
    batch_year_count : { type: Number , required:true , default:0},
    course_id : { type: mongoose.Schema.Types.ObjectId , required:true , ref:'Course'},
    election_id : { type: mongoose.Schema.Types.Object , required:true , ref:'Election'}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Position', electionPositionSchema);