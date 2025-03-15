const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  truckId: { type: String, required: true },
  startDistrict: { type: String, required: true },
  endDistrict: { type: String, required: true },
  userId: { type: String, required: true },
  routePoints: [{
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Route', routeSchema);