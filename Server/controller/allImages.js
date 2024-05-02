const express = require('express');
const router = express.Router();
const ProjectProgress = require('../models/ProjectProgress'); 
router.get('/project-progress/all-images', async (req, res) => {
    try {
        const projectsWithImages = await ProjectProgress.find({ imagePath: { $exists: true, $ne: null } });
        const imagePaths = projectsWithImages.map(project => project.imagePath);
        res.json({ imagePaths });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
