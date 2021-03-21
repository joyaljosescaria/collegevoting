const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    course: {type: String, required: true}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Course', courseSchema);