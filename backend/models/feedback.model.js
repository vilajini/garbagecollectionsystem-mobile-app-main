const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  feedback: { type: String, required: true },
  truckId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);