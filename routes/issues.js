const express = require('express');
const router = express.Router();

// getting issue controller
const issueController = require('../controllers/issue_controller');

router.get('/projectIssues', issueController.projectIssues);
router.post('/addIssue', issueController.addIssue);
router.post('/searchIssues', issueController.searchIssues);
router.post('/filterIssues', issueController.filterIssues);
router.get('/deleteIssue', issueController.deleteIssue);

module.exports = router;