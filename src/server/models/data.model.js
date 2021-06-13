const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
  dataField: {
    type: String,
    required: true,
  },
  dataValue: {
    type: Number,
    required: true,
  },
  dataTimeCreated: {
    type: Date,
    default: Date.now,
  },
  projectID: {
    type: mongoose.Types.ObjectId,
    ref: 'Projects',
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },
});

module.exports = mongoose.model('Datas', DataSchema);
