const mongoose = require('mongoose');
const Project = require('../model/project');

const AcceptProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const supervisorId = req.user._id;
        console.log("=========================")
        console.log(projectId, supervisorId)
        const project = await Project.findOne({
            _id: projectId,
            selectedSupervisor: supervisorId,
            supervisorStatus: 'requested',
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found or not requested by the supervisor.' });
        }

        project.supervisorStatus = 'accepted';
        await project.save();

        res.status(200).json({ message: 'Project accepted successfully.' });
    } catch (error) {
        console.error('Error accepting project:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const DeclineProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const supervisorId = req.user._id;

        const project = await Project.findOne({
            _id: projectId,
            selectedSupervisor: supervisorId,
            supervisorStatus: 'requested',
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found or not requested by the supervisor.' });
        }

        project.supervisorStatus = 'declined';
        await project.save();

        res.status(200).json({ message: 'Project accepted successfully.' });
    } catch (error) {
        console.error('Error accepting project:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    AcceptProject,
    DeclineProject
};
