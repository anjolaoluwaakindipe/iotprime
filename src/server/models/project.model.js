const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  projectID: {
    type: mongoose.Types.ObjectId,
    unique: true,
    default: mongoose.Types.ObjectId,
  },
  projectName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  projectDescription: {
    type: String,
    trim: true,
  },
  projectTimeCreated: {
    type: Date,
    default: Date.now,
  },
  projectFields: {
    type: [
      {
        fieldNumber: { type: Number, trim: true },
        fieldName: { type: String, trim: true },
        fieldUnit: { type: String, trim: true },
      },
    ],
    required: true,
  },
  projectAPI: {
    type: String,
    trim: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },
  dataID: {
    type: [mongoose.Types.ObjectId],
    ref: 'Datas',
  },
  isPrivate: {
    type: Boolean,
    default: false,
    required: true,
  },
});

ProjectSchema.index({ projectName: 'text', projectDescription: 'text' });

module.exports = mongoose.model('Projects', ProjectSchema);
