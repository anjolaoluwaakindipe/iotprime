const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Covenant IOT CloudPlatform' });
});

router.use('/data', require('./data.route'));
router.use('/project', require('./project.route'));
router.use('/user', require('./user.route'));
router.use('/search', require('./search.route'));
router.use('/log', require('./log.route'));

module.exports = router;
