const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name : { type: String, required: true },
    password : { type: String, required: true},
    email : { type: String, required: true},
    otp : { type: String},
    otp_time : { type: Date}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Admin', adminSchema);