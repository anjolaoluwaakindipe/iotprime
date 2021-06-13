const express = require('express');

// model
const Project = require('../models/project.model');
const User = require('../models/user.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const { dataSearch } = req.query;
  let projects = [];
  let users = [];
  const foundProjects = await Project.find(
    {
      $or: [
        {
          projectName: {
            $regex: new RegExp(dataSearch),
          },
        },
        {
          projectDescription: {
            $regex: new RegExp(dataSearch),
          },
        },
        { isPrivate: false },
      ],
    },
    {
      _id: 0,
      __v: 0,
    }
  );

  const foundUsers = await User.find(
    {
      $or: [
        {
          username: {
            $regex: new RegExp(dataSearch),
          },
        },
        {
          firstName: {
            $regex: new RegExp(dataSearch),
          },
        },
        {
          lastName: {
            $regex: new RegExp(dataSearch),
          },
        },
      ],
    },
    {
      _id: 0,
      __v: 0,
    }
  );

  projects.push(...foundProjects);
  users.push(...foundUsers);

  return res.status(200).json({
    success: true,
    projectsFound: projects,
    usersFound: users,
  });
});

module.exports = router;
