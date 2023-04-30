const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issue_name: {
        type: String,
        required: true
    },
    issue_author: {
        type: String,
        required: true
    },
    issue_description: {
        type: String,
        required: true
    },
    issue_lables: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
})

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;