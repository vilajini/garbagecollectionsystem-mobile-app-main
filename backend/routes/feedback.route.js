const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.model');
const nodemailer = require('nodemailer');

// CRUD for feedback
router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).send(newFeedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.params.userId });
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/send-email', async (req, res) => {
  try {
    const { email, reportData } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'assignmentsagaofficial@gmail.com', // Your Gmail email address
        pass: 'uzgi faop atfx zsqr', // Your Gmail password
      },
    });

    // Define email options
    const mailOptions = {
      from: 'assignmentsagaofficial@gmail.com',
      to: 'assignmentsagaofficial@gmail.com',
      subject: 'Feedback Report',
      html: `<p>Here is the feedback report:</p><br>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send(error);
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/getfeedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send('Feedback not found');
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send('Feedback not found');
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;