const express = require('express');

const router = express.Router();

const tokenVerificationMidd = require('../middleware/tokenVerificationMidd');

// Models
const Project = require('../models/project.model');
const Users = require('../models/user.model');
const Log = require('../models/log.model');
const Data = require('../models/data.model');

// get a log folder
router.get('/folder', tokenVerificationMidd, async (req, res) => {
  const allProjects = await Project.find({ userID: req.userID._id });

  const logFolders = await Promise.all(
    allProjects.map(async (project) => {
      const unreadlogs = await Log.find({
        userID: req.userID._id,
        projectID: project._id,
      });

      const modifiedUnreadLogs = unreadlogs.filter(
        (log) => log.isRead === false
      );

      return {
        name: project.projectName,
        _id: project._id,
        unreadMessages: modifiedUnreadLogs.length,
      };
    })
  );

  if (logFolders.length === 0) {
    return res.json({ success: false, message: 'No Logs available' });
  }

  const modifiedLogFolder = logFolders;

  if (modifiedLogFolder.length === 0) {
    return res.json({ success: false, message: 'No Logs available' });
  }

  return res.json({ success: true, data: modifiedLogFolder });
});

// delete a project folder
router.delete('folder/:projectID', tokenVerificationMidd, async (req, res) => {
  await Log.deleteMany({
    userID: req.userID._id,
    projectID: req.params.projectID,
  });

  const deletedProjectLog = await Project.findOne({
    _id: req.params.projectID,
  });

  res.json({
    success: true,
    message: `${deletedProjectLog.projectName} has been deleted`,
  });
});

// get all Logs of a project/folder
router.get('/:projectID', async (req, res) => {
  // await Log.updateMany({}, { $set: { isRead: false } }, { multi: true });
  const projectLog = await Log.find({
    projectID: req.params.projectID,
  }).sort({ timeStamp: -1 });
  return res.json({ success: true, data: projectLog });
});

// get one log
router.get('/:projectID/:logID', async (req, res) => {
  // await Log.updateMany({}, { $set: { isRead: false } }, { multi: true });
  const projectLog = await Log.findOne({
    projectID: req.params.projectID,
    _id: req.params.logID,
  });
  return res.json({ success: true, data: projectLog });
});

// delete a specific log
router.delete('/:projectID/:logID', tokenVerificationMidd, async (req, res) => {
  await Log.deleteOne({
    projectID: req.params.projectID,
    _id: req.params.logID,
  });
  return res.json({ success: true, message: 'Log has been deleted' });
});

// mark log as read
router.put('/:projectID/:logID', async (req, res) => {
  const log = await Log.findOne({
    _id: req.params.logID,
    projectID: req.params.projectID,
  });

  await log
    .updateOne({ isRead: true })
    .then(() => {
      log.save();
      return res.json({ success: true, message: 'Message has been read' });
    })
    .catch((err) => console.log(err));

  return res.json({ success: true, message: 'Message has been read' });
});

module.exports = router;
