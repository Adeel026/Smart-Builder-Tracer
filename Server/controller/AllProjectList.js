const Project = require('../model/project');

const getAllProjects = async (req, res) => {
  try {
    const user = req.user
    // console.log("user issssss", user)
    const projects = await Project.find({ selectedSupervisor: user._id, supervisorStatus: 'accepted' });
    res.status(200).json({user, projects});
    console.log(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProjects,
};

