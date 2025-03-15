const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user.route'); // Make sure you have this file and path correctly set

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config(); // At the top of your main file (e.g., app.js or server.js)

// Middleware
app.use(cors());
app.use(express.json()); // Using express's built-in middleware

// MongoDB Connection
mongoose.connect('mongodb+srv://pasindu:pasindu@cluster0.gzomo.mongodb.net/garbageCollectionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error:', error);
});

// Routes
app.use('/api/auth', authRoutes); // Auth routes for signup and signin
app.use('/api/routes', require('./routes/routes.route'));
app.use('/api/feedback', require('./routes/feedback.route'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});