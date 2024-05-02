const express = require('express');
const router = express.Router();
const path=require('path')
const multer = require('multer');
const ProjectProgress = require('../model/projectProgress');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix  + '.jpg');
    },
  });
  
  const upload = multer({ storage: storage });

// Get project progress that is neither completed nor in progress
router.get('/project-progress/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
      
        const progressNotCompletedInProgress = await ProjectProgress.find({
            $and: [
                { project: projectId },
                { completedOn: { $exists: false } },
                { inProgressOn: { $exists: false } }
            ]
        });
        res.json(progressNotCompletedInProgress);
    } catch (error) {
        console.error('Error fetching progress not completed and not in progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all completed project progress
router.get('/project-progress/completed/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const completedProgress = await ProjectProgress.find({
            $and: [
                { project: projectId },
                { completedOn: { $exists: true } }
            ]
        });
        res.json(completedProgress);
    } catch (error) {
        console.error('Error fetching completed project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all in-progress project progress
router.get('/project-progress/in-progress/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const inProgressProgress = await ProjectProgress.find({
            $and: [
                { project: projectId },
                { completedOn: { $exists: false } },
                { inProgressOn: { $exists: true } }
            ]
        });
        res.json(inProgressProgress);
    } catch (error) {
        console.error('Error fetching in-progress project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create new project progress
router.post('/project-progress', async (req, res) => {
    try {
        const { project, title, description, type, dueDate } = req.body;

        const newProgress = new ProjectProgress({
            project,
            title,
            description,
            type,
            dueDate,
        });

        const savedProgress = await newProgress.save();
        res.json(savedProgress);
    } catch (error) {
        console.error('Error saving project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.put('/project-progress/:id/move-to-in-progress',upload.single('image'), async (req, res) => {
//     try {
//         const { id } = req.params;
//         const imagePath = req.file ? req.file.path : null;

//         const updatedProgress = await ProjectProgress.findByIdAndUpdate(
//             id,
//             { $set: { inProgressOn: new Date(),imagePath } },
//             { new: true }
//         );

//         if (!updatedProgress) {
//             return res.status(404).json({ error: 'Project progress not found' });
//         }

//         res.json(updatedProgress);
//     } catch (error) {
//         console.error('Error updating project progress:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.put('/project-progress/:id/move-to-in-progress', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const imagePath = req.file ? req.file.path : null;
        console.log(imagePath)

        const updatedProgress = await ProjectProgress.findByIdAndUpdate(
            id,
            { $set: { inProgressOn: new Date(), imagePath } },
            { new: true }
        );

        if (!updatedProgress) {
            return res.status(404).json({ error: 'Project progress not found' });
        }

        res.json(updatedProgress);
    } catch (error) {
        console.error('Error updating project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Complete project progress
router.put('/project-progress/:id/complete',upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const imagePath = req.file ? req.file.path : null;
        console.log(imagePath);
        const updatedProgress = await ProjectProgress.findByIdAndUpdate(
            id,
            { $set: { completedOn: new Date(),imagePath  } },
            { new: true }
        );

        if (!updatedProgress) {
            return res.status(404).json({ error: 'Project progress not found' });
        }

        res.json(updatedProgress);
    } catch (error) {
        console.error('Error completing project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/project-progress/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProgress = await ProjectProgress.findByIdAndDelete(id);

        if (!deletedProgress) {
            return res.status(404).json({ error: 'Project progress not found' });
        }

        res.json({ message: 'Project progress deleted successfully' });
    } catch (error) {
        console.error('Error deleting project progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// router.get('/project-progress/:id/images', async (req, res) => {
//   console.log('Backend route accessed');
//   try {
//     const { id } = req.params;
//     console.log(id);
//     const projectProgress = await ProjectProgress.find({ project: id });
//     console.log("The project progress is ", projectProgress);

//     if (!projectProgress || projectProgress.length === 0) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     const imagePaths = projectProgress.map(progress => progress.imagePath);
//     // const imagePathsFull = imagePaths.map(imagePath => path.join('uploads', imagePath.replace('uploads/uploads/', '')).replace(/\\/g, '/'));
//     console.log("The images are ", imagePaths );
//     console.log('the title is ' ,projectProgress[0].title)

//     res.json({ imagePaths:imagePaths ,projectTitle:projectProgress.title });
//   } catch (error) {
//     console.error('Error retrieving images:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


router.get('/project-progress/:id/images', async (req, res) => {
    console.log('Backend route accessed');
    try {
      const { id } = req.params;
      console.log(id);
      const projectProgress = await ProjectProgress.find({ project: id });
      console.log("The project progress is ", projectProgress);
  
      if (!projectProgress || projectProgress.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      const imagePaths = projectProgress.map(progress => progress.imagePath);
      console.log("The images are ", imagePaths);
      
      const projectTitles = projectProgress.map(progress => progress.title);

      console.log('the titles are', projectTitles);
  
      res.json({ imagePaths: imagePaths, projectTitle: projectTitles });
    } catch (error) {
      console.error('Error retrieving images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  




module.exports = router;
