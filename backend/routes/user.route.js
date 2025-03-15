const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (!['admin', 'garbageCollector', 'publicUser'].includes(userType)) {
      return res.status(400).send('Invalid user type');
    }
    const user = new User({ email, password, userType });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).send('Invalid credentials');
      }
      // Include _id and userType in the response
      res.status(200).send({ 
        message: 'Login successful', 
        userId: user._id,  // Pass the _id as userId to the client
        userType: user.userType
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });  

module.exports = router;