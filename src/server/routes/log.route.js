const express = require('express');

const router = express.Router();

const Log = require('../models/log.model');

// get all Logs of a project
router.get('/:projectID', async (req, res) => {
  const projectLog = await Log.find({ projectID: req.params.projectID });
  return res.status(200).json({ success: true, data: projectLog });
});

module.exports = router;
