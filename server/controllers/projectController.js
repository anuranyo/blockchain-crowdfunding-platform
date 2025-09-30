const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('creator', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id).populate('creator', 'name email');
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// @desc    Create a project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  const { title, description, imageURL, goalAmount, deadline } = req.body;

  try {
    const project = new Project({
      title,
      description,
      imageURL,
      goalAmount,
      deadline,
      creator: req.user._id,
    });

    const createdProject = await project.save();
    
    // TODO: Here we will later call the ML service to predict success
    
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};