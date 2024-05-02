const express = require('express');
const router = express.Router();
const Chat = require('../model/chat');
const User = require('../model/userSchema');

router.get('/getname/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/messages/:projectId', async (req, res) => {
  const { projectId } = req.params;
  // console.log(projectId)
  // console.log("=======")

  try {
    const messages = await Chat.find({ project: projectId })
      .sort({ timestamp: 1 });
    // console.log(messages)

    res.status(200).json(messages);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
