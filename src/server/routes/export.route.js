const express = require('express');

// model
const Project = require('../models/project.model');
const Data = require('../models/data.model');
const User = require('../models/user.model');
const Log = require('../models/log.model');

// object to csv export
const ObjectsToCsv = require('objects-to-csv');

// file system
const fs = require('fs');

// custom middleware
const tokenVerificationMidd = require('../middleware/tokenVerificationMidd');

const router = express.Router();

router.get('/csv/:projectID', tokenVerificationMidd, async (req, res) => {
  const existingUser = await User.findOne({ _id: req.userID._id });

  if (!existingUser) {
    return res.json({ success: false, message: 'No user was found' });
  }

  const existingProject = await Project.findOne({
    _id: req.params.projectID,
    userID: existingUser._id,
  });

  if (!existingProject) {
    return res.json({ success: false, message: 'Project ID was not found' });
  }

  const allData = await Data.find({
    projectID: req.params.projectID,
    userID: req.userID._id,
  });

  console.log(allData);

  if (allData.length === 0) {
    return res.json({ success: false, message: 'No data available' });
  }

  const modifiedDataObject = allData.map((data) => ({
    parameter: data.dataField,
    value: data.dataValue,
    time: new Date(data.dataTimeCreated).toUTCString(),
  }));

  const csv = new ObjectsToCsv(modifiedDataObject);

  // Save to file:
  await csv.toDisk('./' + existingProject.projectName + '.csv');

  return res.download('./' + existingProject.projectName + '.csv', () => {
    fs.unlinkSync('./' + existingProject.projectName + '.csv');
  });

  // console.log(fastcsv);

  // return res.json({ success: true, message: 'Data sent' });
});

module.exports = router;
