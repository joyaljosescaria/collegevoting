const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: { type: String , required: true},
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batch_year_count: { type: Number , required: true },
    unique_id: { type: String , required: true },
    password: { type: String},
    email: { type: String , required: true},
    had_candidate: { type: Boolean , default: false },
    pass_added_time : { type: Date },
    profile_pic: { type: String  , required: true},
    id_card: { type: String , required: true},
    id_card_selfi : { type: String },
    supli : { type: String , default: "0"},
    is_active : { type: Boolean , required: true , default: true},
    is_verified : { type: Boolean , required: true, default: false },
    not_verify_reason : { type: String}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Student', studentSchema);