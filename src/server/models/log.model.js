const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  message: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  projectID: {
    type: mongoose.Types.ObjectId,
    ref: 'Projects',
  },
});

module.exports = mongoose.model('Logs', logSchema);
