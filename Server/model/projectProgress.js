const mongoose = require('mongoose');

const projectProgressSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
    get: function (value) {
      return value ? new Date(value).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) : null;
    }
  },
  inProgressOn: {
    type: Date,
  },
  completedOn: {
    type: Date,
  },

  imagePath: {
    type: String,
  },
});

const ProjectProgress = mongoose.model('ProjectProgress', projectProgressSchema);

module.exports = ProjectProgress;
