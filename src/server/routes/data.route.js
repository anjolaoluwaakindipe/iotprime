const express = require('express');

// model
const Project = require('../models/project.model');
const Data = require('../models/data.model');
const User = require('../models/user.model');
const Log = require('../models/log.model');

// custom middleware
const tokenVerificationMidd = require('../middleware/tokenVerificationMidd');

const router = express.Router();

// create data/field information
router.get('/:email/:projectAPI', async (req, res) => {
  // get user from user email
  const existingUser = await User.findOne({ email: req.params.email });

  // get user project from project API
  const existingProjects = await Project.find({
    projectAPI: req.params.projectAPI,
  });

  // check if user owns that project
  const userProject = existingProjects.filter((project) => {
    return project.userID.toString === existingUser._id.toString;
  });

  // check if user email exist
  if (!existingUser) {
    await new Log({
      message: 'Enter a valid email in your parameters',
      projectID: userProject[0]._id,
      userID: existingUser._id,
    }).save();
    return res.status(401).json({
      success: false,
      message: 'Enter a valid email in your parameters',
      timeStamp: new Date().toUTCString(),
    });
  }

  // check if project exists
  if (!existingProjects) {
    await new Log({
      message: 'Enter a valid project API in your parameters',
      projectID: userProject[0]._id,
      userID: existingUser._id,
    }).save();
    return res.status(401).json({
      success: false,
      message: 'Enter a valid project API in your parameters',
      timeStamp: new Date().toUTCString(),
    });
  }

  if (userProject.length === 0) {
    await new Log({
      message: 'Project API does not match user',
      projectID: userProject[0]._id,
      userID: existingUser._id,
    }).save();
    return res.status(401).json({
      success: false,
      message: 'Project API does not match user',
      timeStamp: new Date().toUTCString(),
    });
  }

  // get project fields from user's project
  const projectFieldNames = userProject[0].projectFields.map(
    (field) => field.fieldName
  );

  // get query keys
  let queryKeyNames = Object.keys(req.query);
  if (queryKeyNames.length === 0) {
    await new Log({
      message: 'Please input queries to send to your project',
      projectID: userProject[0]._id,
      userID: existingUser._id,
    }).save();
    return res.json({
      success: false,
      message: 'Please input queries to send to your project',
      timeStamp: new Date().toUTCString(),
    });
  }

  // variable to hold wrong query keys
  let wrongQueryNames = [];

  // sends correct query keys and stores incorrect ones
  for (let i = 0; i < queryKeyNames.length; i++) {
    if (projectFieldNames.includes(queryKeyNames[i])) {
      const newDataEntry = new Data({
        dataField: queryKeyNames[i],
        dataValue: req.query[queryKeyNames[i]],
        projectID: userProject[0]._id,
        userID: existingUser._id,
      });
      await newDataEntry
        .save()
        .then()
        .catch((err) => console.log(err));
    } else {
      wrongQueryNames.push(queryKeyNames[i]);
    }
  }
  var io = req.app.get('socketio');
  io.emit(existingProjects[0]._id);

  const message1 = `Not all data was sent successfully. Data for fields: ${wrongQueryNames.toString()} were not added because they were either mispelt or are not part of the fields of this project`;
  const message2 = 'All Data was sent successfully';

  console.log(existingUser._id);

  // Sends a log to the user's account and response to their embedded device of the incorrect query keys that were not sent
  if (wrongQueryNames.length > 0) {
    await new Log({
      message: message1,
      projectID: userProject[0]._id,
      userID: existingUser._id,
    }).save();
    return res.json({
      success: true,
      message: message1,
      timeStamp: new Date().toUTCString(),
    });
  }

  // Sends a log to the user's account and response to their embedded device that nothing wrong happened
  await new Log({
    message: message2,
    projectID: userProject[0]._id,
    userID: existingUser._id,
  }).save();
  return res.json({
    success: true,
    message: message2,
    timeStamp: new Date().toUTCString(),
  });
});

// get data for the day
router.get(
  '/:projectID/:dataField/todaydata',
  [tokenVerificationMidd],
  async (req, res) => {
    // finds all specific field data belonging to that accounts project for the span of the day
    const theDaysData = await Data.find({
      projectID: req.params.projectID,
      dataField: req.params.dataField,
      userID: req.userID._id,
      dataTimeCreated: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    });

    // checks if there's any data for that project (error handling)
    if (theDaysData.length === 0) {
      return res.json({
        success: false,
        message: 'There are no available data for today',
      });
    }

    // responds with the data within the range
    res.json({
      success: true,
      message: 'Here are todays data',
      data: theDaysData.map((data) => ({
        dataValue: data.dataValue,
        dataTimeCreated: data.dataTimeCreated,
      })),
    });
  }
);

// get data for the week
router.get(
  '/:projectID/:dataField/weekdata',
  [tokenVerificationMidd],
  async (req, res) => {
    // finds all specific field data belonging to that accounts project for the span of the week
    const thisWeeksData = await Data.find({
      projectID: req.params.projectID,
      dataField: req.params.dataField,
      userID: req.userID._id,
      dataTimeCreated: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    });

    // checks if there is any data for the week (error handling)
    if (thisWeeksData.length === 0) {
      res.json({
        success: false,
        message: 'There are no available data for this week',
      });
    }

    // responds with the data for the week
    res.json({
      success: true,
      message: "Here this week's data",
      data: thisWeeksData.map((data) => ({
        dataValue: data.dataValue,
        dataTimeCreated: data.dataTimeCreated,
      })),
    });
  }
);

// get data for a month
router.get(
  '/:projectID/:dataField/monthdata',
  [tokenVerificationMidd],
  async (req, res) => {
    // finds all specific field data belonging to that accounts project for the span of the month
    const thisWeeksData = await Data.find({
      projectID: req.params.projectID,
      dataField: req.params.dataField,
      userID: req.userID._id,
      dataTimeCreated: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    });

    // checks if there is any data for the month (error handling)
    if (thisWeeksData.length === 0) {
      res.json({
        success: false,
        message: 'There are no available data for this month',
      });
    }

    // responds with the data for the month
    res.json({
      success: true,
      message: "Here this month's data",
      data: thisWeeksData.map((data) => ({
        dataValue: data.dataValue,
        dataTimeCreated: data.dataTimeCreated,
      })),
    });
  }
);

// get data for the year
router.get(
  '/:projectID/:dataField/yeardata',
  [tokenVerificationMidd],
  async (req, res) => {
    // finds all specific field data belonging to that accounts project for the span of the week
    const thisYearsData = await Data.find({
      projectID: req.params.projectID,
      dataField: req.params.dataField,
      userID: req.userID._id,
      dataTimeCreated: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 365)),
      },
    });

    // checks if there is data for the year (error handling)
    if (thisYearsData.length === 0) {
      return res.json({
        success: false,
        message: 'There are no available data for this year',
      });
    }

    // responds with data for the year
    return res.json({
      success: true,
      message: "Here are this year's data",
      data: thisYearsData.map((data) => ({
        dataValue: data.dataValue,
        dataTimeCreated: data.dataTimeCreated,
      })),
    });
  }
);

// get data from any date
router.post(
  '/:projectID/:dataField/anydate',
  [tokenVerificationMidd],
  async (req, res) => {
    const date = req.body.date;

    const anyDateData = await Data.find({
      projectID: req.params.projectID,
      dataField: req.params.dataField,
      userID: req.userID._id,
      dataTimeCreated: {
        $lt: new Date(),
        $gte: date,
      },
    });

    if (!anyDateData || anyDateData === 0) {
      return res.json({
        success: false,
        message: 'There are no available data for this year',
      });
    }

    return res.status(200).json({
      success: true,
      message: "Here are this year's data",
      data: anyDateData.map((data) => ({
        dataValue: data.dataValue,
        dataTimeCreated: data.dataTimeCreated,
      })),
    });
  }
);

// get the latest 30 updated fields
router.get('/lastupdated', [tokenVerificationMidd], async (req, res) => {
  const lastTwentyUpdatedFields = await Data.find({ userID: req.userID._id })
    .sort({
      dataTimeCreated: -1,
    })
    .limit(20);

  if (!lastTwentyUpdatedFields) {
    return res.json({
      success: false,
      message: 'No data available please create a project and send data',
    });
  }

  const modifiedLastTwentyUpdatedFields = await Promise.all(
    lastTwentyUpdatedFields.map(async (field) => {
      const project = await Project.findOne({ _id: field.projectID });
      return {
        dataID: field._id,
        fieldName: field.dataField,
        value: field.dataValue,
        createdAt: new Date(field.dataTimeCreated).toLocaleString(),
        projectName: project.projectName,
        projectID: project._id,
      };
    })
  );

  return res.json({
    success: true,
    data: [...modifiedLastTwentyUpdatedFields],
  });
});

module.exports = router;
