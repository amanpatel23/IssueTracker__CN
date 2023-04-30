const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    project_name: {
        type: String, 
        required: true
    },
    project_description: {
        type: String,
        required: true
    },
    project_author: {
        type: String,
        required: true
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        requried: true
    }]
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;