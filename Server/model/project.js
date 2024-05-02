const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  totalMarlas: {
    type: Number,
    required: true,
  },
  stories: {
    type: Number,
    required: true,
  },
  address: {
    type: String
  },
  date: {
    type: Date
  },
  supervisorStatus: String,
  selectedSupervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


const Project = mongoose.model("Project", projectSchema);
module.exports = Project;