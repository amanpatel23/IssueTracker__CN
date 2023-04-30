
const Project = require('../models/project');
const Issue = require('../models/issue');

// controller for showing project issues on issue page
module.exports.projectIssues = async function(request, response) {
    try {
        // getting the project by project id and populating issues array
        const project = await Project.findById(request.query.project_id).populate({
            path: 'issues',
            model: 'Issue'
        });

        // getting unique authors name
        const authorSet = new Set(project.issues.map(issue => issue.issue_author));
        const authorNames = Array.from(authorSet);

        return response.render('issue', {
            title: 'IssueTracker | ProjectIssue',
            project,
            authorNames
        })
    }
    catch (error) {
        console.log('error --> issue_controller -> projectIssue ', error);
    }
}

// controller for adding the issue to the database
module.exports.addIssue = async function(request, response) {

    // getting form inputs
    const project_id = request.query.project_id;
    const issue_name = request.body.name;
    const issue_author = request.body.author;
    const issue_description = request.body.description;
    const issue_lables = request.body.lables;

    try {
        // adding the issue to the database
        const issue = await Issue.create({issue_name, issue_author, issue_description, issue_lables});

        // adding the issue to the project issue array
        const project = await Project.findById(project_id);
        project.issues.push(issue);
        await project.save();

        // request.flash('success', 'Issue Added!');
        return response.redirect(`/issues/projectIssues?project_id=${project_id}`);
    }
    catch (error) {
        console.log('error --> issue_controller -> addIssue ', error);
    }
}

// controller for searching the issue based on issue title or issue description
module.exports.searchIssues = async function(request, response) {
    // getting form input
    const searchText = request.body.search__text;
    try {
        // matching the searchText to issue name and issue description
        const project = await Project.findById(request.query.project_id).populate({
            path: 'issues',
            model: 'Issue',
            match: {
                $or: [
                    {issue_name: searchText},
                    {issue_description: searchText}
                ]
            }
        });


        const authorNames = await getAuthors(request.query.project_id);

        return response.render('issue', {
            title: 'IssueTracker | ProjectIssue',
            project,
            authorNames
        })
    }
    catch (error) {
        console.log('error --> issue_controller -> searchIssues ', error);
    }
}

// controller for filtering the issues
module.exports.filterIssues = async function(request, response) {
    
    // getting form inputs
    const lables = request.body.f_lables;
    const authors = request.body.authors;

    try {
        // matching the lables and authors
        const project = await Project.findById(request.query.project_id).populate({
            path: 'issues',
            model: 'Issue',
            match: {
                $or: [
                    {issue_lables: {$in: lables}},
                    {issue_author: {$in: authors}}
                ]
            }
        }); 
    
        const authorNames = await getAuthors(request.query.project_id);
    
        return response.render('issue', {
            title: 'IssueTracker | ProjectIssue',
            project,
            authorNames
        })
    }
    catch (error) {
        console.log('error --> issue_controller -> filterIssues ', error);
    }
}

// function for getting unique authors name to show in the filter form
async function getAuthors(projectId) {
    try {
        const global_project = await Project.findById(projectId).populate({
            path: 'issues', 
            model: 'Issue'
        });
        const authorSet = new Set(global_project.issues.map(issue => issue.issue_author));
        const authorNames = Array.from(authorSet);
        return authorNames;
    }
    catch(error) {
        console.log('error --> issue_controller -> getAuthors ', error);
    }
}

// controller for deleting the issue
module.exports.deleteIssue = async function(request, response) {
    // getting the project and issue ids
    const projectId = request.query.project_id;
    const issueId = request.query.issue_id;

    try {
        // deleting issue from the project issues array
        await Project.findByIdAndUpdate(projectId, {
            $pull: {issues: issueId},
        });

        // deleting the issue from the Issue schema
        await Issue.deleteOne({_id: issueId});

        // request.flash('success', 'Issue Deleted!');
        return response.redirect(`/issues/projectIssues?project_id=${projectId}`);
    }
    catch (error) {
        console.log('error --> issue_controller -> deleteIssue ', error);
    }
}