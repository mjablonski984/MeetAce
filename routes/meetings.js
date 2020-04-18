const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Meeting = require('../models/Meeting');

// @route     GET api/meetings
// @desc      Get all users meetingss
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    // get meetings for logged user (user with matching id)
    const meetings = await Meeting.find({ user: req.user.id }).sort({ date: -1 });
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/meetings
// @desc      Add new meeting
// @access    Private
router.post(
  '/',
  [
    auth,
    check('name', 'Name is required').not().isEmpty().trim(),
    check('phone', 'Valid phone is required').not().isEmpty().trim(),
    check('date', 'Meeting date is required').not().isEmpty().trim(),
    check('time', 'Meeting time is required').not().isEmpty().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, date, time, description, type } = req.body;

    try {
      const newMeeting = new Meeting({
        name,
        phone,
        email,
        date,
        time,
        description,
        type,
        user: req.user.id
      });

      const meeting = await newMeeting.save();

      res.json(meeting);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/meetings/:id
// @desc      Update meeting
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, phone, email, date, time, description, type } = req.body;

  const meetingObj = {};
  if (name) meetingObj.name = name;
  if (phone) meetingObj.phone = phone;
  if (email) meetingObj.email = email;
  if (date) meetingObj.date = date;
  if (time) meetingObj.time = time;
  if (description) meetingObj.description = description;
  if (type) meetingObj.type = type;

  try {
    let meeting = await Meeting.findById(req.params.id);

    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' });

    // Make sure user owns meeting; then check if user editing meeting is the same as loggedin user(check token req.user.id)
    if (meeting.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { $set: meetingObj },
      { new: true }
    );

    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/meetings/:id
// @desc      Delete meeting
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let meeting = await Meeting.findById(req.params.id);

    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' });

    if (meeting.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Meeting.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Meeting removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
