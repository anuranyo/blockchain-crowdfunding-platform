const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProjects)
    .post(protect, createProject);

router.route('/:id')
    .get(getProjectById);

module.exports = router;