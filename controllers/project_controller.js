const Project = require('../models/project');
const Issue = require('../models/issue');

// controller for adding the project through form submission
module.exports.addProject = async function(request, response) {

    // getting the form inputs
    const project_name = request.body.name;
    const project_description = request.body.description;
    const project_author = request.body.author;

    try {
        // adding the project in the database
        await Project.create({project_name, project_description, project_author});
        request.flash('success', 'Project Created!');
        return response.redirect('back');
    }
    catch (error) {
        console.log('error --> project_controller -> addProject ', error);
        response.redirect('back');
    }
}

// controller for deleting the project from database
module.exports.deleteProject = async function (request, response) {
    const projectId = request.query.project_id;
    try {

        // getting the project by id
        const project = await Project.findById(projectId).populate('issues');
        
        // deleting all the issues related to the project
        for (const issue of project.issues) {
            await Issue.findByIdAndDelete(issue._id);
        }

        // deleting the project
        await Project.findByIdAndDelete(projectId);

        request.flash('success', 'Project Deleted!');
        return response.redirect('back');
    }
    catch (error) {
        console.log('error --> issue_controller -> deleteProject ', error);
        response.redirect('back');
    }
}