const Project = require("../model/project");

const ShowProject = async (req, res) => {
  try {
    const loginDetails = req.user;
    const projects = await Project.find({ createdBy: loginDetails._id });
    console.log(projects);
    res.status(200).json({ loginDetails, projects });
  } catch (error) {
    console.error("Error in ShowProject:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ShowRequestedProjects = async (req, res) => {
  try {
    const loginDetails = req.user;
    console.log(loginDetails)
    const requestedProjects = await Project.find({ selectedSupervisor: loginDetails._id, supervisorStatus: 'requested' });
    console.log(requestedProjects);
    res.status(200).json({ requestedProjects });
  } catch (error) {
    console.error("Error in ShowProject:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  ShowProject,
  ShowRequestedProjects
};
