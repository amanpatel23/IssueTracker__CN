
const Project = require('../models/project');

// controller for showing up projects on home page
module.exports.home = async function(request, response) {
    try {
        const projects = await Project.find({});
        response.render('home', {
            title: 'IssueTracker | Home',
            projects
        })
    }
    catch (error) {
        console.log('error --> home_controller -> home ', error);
    }
}