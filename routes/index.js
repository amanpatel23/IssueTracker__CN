const express = require('express');
const router = express.Router();

// getting home controller
const homeController = require('../controllers/home_controller');

// controller for the home page
router.get('/', homeController.home);

// getting projects and issues routes
router.use('/projects', require('./projects'));
router.use('/issues', require('./issues'));

module.exports = router;