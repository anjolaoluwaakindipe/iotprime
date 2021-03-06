// package imports
const express = require('express');

// Middleware import
const tokenVerificationMidd = require('../middleware/tokenVerificationMidd');
const {
  projectCreationValidator,
  projectCreationValidationResult,
} = require('../middleware/validators/projectCreationVal');

// Models
const Project = require('../models/project.model');
const Users = require('../models/user.model');
const Log = require('../models/log.model');
const Data = require('../models/data.model');

// Router
const router = express.Router();

router.get('/home', (req, res) => {
  res.send('Welcome to the project api url');
});

// get all projects based on account
router.get('/', [tokenVerificationMidd], async (req, res) => {
  // use token to get all projects
  const allProjects = await Project.find({ userID: req.userID._id }).sort({
    projectTimeCreated: -1,
  });

  // modify the project info response
  const modified = allProjects.map(
    ({
      _id,
      projectName,
      projectAPI,
      projectTimeCreated,
      projectDescription,
    }) => ({
      _id,
      projectName,
      projectAPI,
      projectTimeCreated: new Date(projectTimeCreated).toLocaleTimeString(),
      projectDateCreated: projectTimeCreated.toDateString(),
      projectDescription,
    })
  );

  // response containing all projects info
  res.status(200).json({ success: true, data: modified });
});

// get a specific project based on account
router.get('/:_id', [tokenVerificationMidd], async (req, res) => {
  // find specific project
  const selectedProject = await Project.findOne({
    _id: req.params._id,
    userID: req.userID._id,
  });

  // check if that project is real
  if (!selectedProject) {
    res
      .status(400)
      .json({ success: false, message: 'You have no project like that' });
  }

  // send info of that project
  res.status(200).json({ success: true, data: selectedProject });
});

// create project
router.post(
  '/',
  [
    tokenVerificationMidd,
    projectCreationValidator,
    projectCreationValidationResult,
  ],
  async (req, res) => {
    // destructuring request
    const {
      name,
      description,
      field1,
      field1Unit,
      field2,
      field2Unit,
      field3,
      field3Unit,
      field4,
      field4Unit,
      field5,
      field5Unit,
      field6,
      field6Unit,
      field7,
      field7Unit,
      field8,
      field8Unit,
      field9,
      field9Unit,
      field10,
      field10Unit,
      field11,
      field11Unit,
      field12,
      field12Unit,
      field13,
      field13Unit,
      field14,
      field14Unit,
      field15,
      field15Unit,
      field16,
      field16Unit,
      field17,
      field17Unit,
      field18,
      field18Unit,
      field19,
      field19Unit,
      field20,
      field20Unit,
    } = req.body;

    // fields validations
    const fields = [
      { fieldName: field1, fieldUnit: field1Unit },
      { fieldName: field2, fieldUnit: field2Unit },
      { fieldName: field3, fieldUnit: field3Unit },
      { fieldName: field4, fieldUnit: field4Unit },
      { fieldName: field5, fieldUnit: field5Unit },
      { fieldName: field8, fieldUnit: field8Unit },
      { fieldName: field6, fieldUnit: field6Unit },
      { fieldName: field7, fieldUnit: field7Unit },
      { fieldName: field8, fieldUnit: field8Unit },
      { fieldName: field9, fieldUnit: field9Unit },
      { fieldName: field10, fieldUnit: field10Unit },
      { fieldName: field11, fieldUnit: field11Unit },
      { fieldName: field12, fieldUnit: field12Unit },
      { fieldName: field13, fieldUnit: field13Unit },
      { fieldName: field14, fieldUnit: field14Unit },
      { fieldName: field15, fieldUnit: field15Unit },
      { fieldName: field16, fieldUnit: field16Unit },
      { fieldName: field17, fieldUnit: field17Unit },
      { fieldName: field18, fieldUnit: field18Unit },
      { fieldName: field19, fieldUnit: field19Unit },
      { fieldName: field20, fieldUnit: field20Unit },
    ];
    const validFields = fields.filter(
      (field) => field.fieldName !== '' && field.fieldName !== undefined
    );
    if (validFields.length === 0) {
      res.json({
        success: false,
        message: 'Please provide at least one field name',
      });
    }
    // remove duplicates from validfields
    const removeduplicates = (duplicates) => {
      const flag = {};
      const unique = [];
      duplicates.forEach((elem) => {
        if (!flag[elem.fieldName]) {
          flag[elem.value] = true;
          unique.push(elem);
        }
      });
      console.log(flag);
      return unique;
    };
    const uniqueValidFields = removeduplicates(validFields);

    // Create project API
    const { v4 } = require('uuid');
    const apikey = v4();

    // create project
    const newProject = new Project({
      projectName: name,
      projectDescription: description,
      projectFields: uniqueValidFields,
      projectAPI: apikey,
      userID: req.userID,
    });

    await newProject.save();

    // find user of the project
    const user = await Users.findOne({ _id: req.userID._id });

    // add/link new project to account
    user.projects.push(newProject._id);
    user.updateOne({ projects: user.projects });
    user.save();

    // send success
    res.status(200).json({ success: true });
  }
);

// update a project
router.put('/:_id', [tokenVerificationMidd], async (req, res) => {
  const { name, description } = req.body;
  const unmodifiedProject = await Project.findOne({
    _id: req.params._id,
    userID: req.userID._id,
  });

  // check if that project is real
  if (!unmodifiedProject) {
    return res
      .status(400)
      .json({ success: false, message: 'You have no project like that' });
  }

  unmodifiedProject
    .updateOne({ projectName: name, projectDescription: description })
    .then(() => {
      unmodifiedProject.save();
      return res
        .status(200)
        .json({ success: true, message: 'Project has been updated!' });
    })
    .catch((err) => console.log(err));
});

// update project privacy
router.put('/:_id/updatePrivacy', [tokenVerificationMidd], async (req, res) => {
  const unmodifiedProject = await Project.findOne({
    _id: req.params._id,
    userID: req.userID._id,
  });

  // check if that project is real
  if (!unmodifiedProject) {
    return res
      .status(400)
      .json({ success: false, message: 'You have no project like that' });
  }

  await unmodifiedProject
    .updateOne({ isPrivate: !unmodifiedProject.isPrivate })
    .then(() => {
      unmodifiedProject.save();
      return res
        .status(200)
        .json({ success: true, message: 'Project has been updated!' });
    })
    .catch((err) => console.log(err));
});

// delet a project
router.delete('/:_id', tokenVerificationMidd, async (req, res) => {
  await Project.deleteOne({
    _id: req.params._id,
    userID: req.userID._id,
  }).catch((err) => console.log(err));
  await Data.deleteMany({
    projectID: req.params._id,
    userID: req.userID._id,
  }).catch((err) => console.log(err));
  await Log.deleteMany({
    projectID: req.params._id,
    userID: req.userID._id,
  }).catch((err) => console.log(err));
  return res.json({
    success: true,
    message:
      'Your has been successfully deleted Project and its data has been deleted',
  });
});

module.exports = router;
