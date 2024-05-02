const mongoose = require('mongoose');
const Details = require('../model/project');
const addDetails = async (req, res) => {
  try {
    const { projectTitle, totalMarlas, stories, address, date, supervisorStatus, selectedSupervisor } = req.body;

    if (!projectTitle || !totalMarlas || !stories) {
      return res.status(400).json({ error: 'Please provide all required details.' });
    }
    const createdBy = req.user._id;
    console.log("created by", createdBy);
    const newDetails = new Details({
      projectTitle,
      totalMarlas,
      stories,
      address,
      date,
      supervisorStatus,
      selectedSupervisor,
      createdBy
    });
    const savedDetails = await newDetails.save();
    res.status(201).json(savedDetails);
    console.log("Saved Successfully")
  } catch (error) {
    console.error('Error adding details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addDetails,
};
