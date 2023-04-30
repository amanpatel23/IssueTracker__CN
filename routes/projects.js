const express = require('express');
const router = express.Router();

// getting project controller
const projectController = require('../controllers/project_controller');

router.post('/addProject', projectController.addProject);
router.get('/deleteProject', projectController.deleteProject);

module.exports = router;