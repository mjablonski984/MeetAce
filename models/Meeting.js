const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: true,
    match: /^(\+[0-9]{2})?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,4})$/
  },
  date: {
    type: String,
    required: true,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  },
  time: {
    type: String,
    required: true,
    match: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  },
  description: {
    type: String,
    maxlength: 200,
    trim: true
  },
  type: {
    type: String,
    default: 'personal'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('meeting', MeetingSchema);
