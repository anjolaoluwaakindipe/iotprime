const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter your email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  firstName: {
    type: String,
    max: 64,
    required: [true, 'Please enter your first name'],
    trim: true,
  },
  lastName: {
    type: String,
    max: 64,
    required: [true, 'Please enter your last name'],
    trim: true,
  },
  userTimeCreated: {
    type: Date,
    default: Date.now,
  },
  projects: {
    type: [mongoose.Types.ObjectId],
    ref: 'Projects',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user',
  },
});

module.exports = mongoose.model('Users', UserSchema);
