const express = require('express');
const router = express.Router();
const Route = require('../models/route.model');

router.post('/', async (req, res) => {
  const { userId, truckId, startDistrict, endDistrict, routePoints } = req.body;
  try {
    const newRoute = new Route({ truckId, userId, startDistrict, endDistrict, routePoints });
    await newRoute.save();
    res.status(201).send(newRoute);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).send('Route not found');
    }
    res.send(route);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
      const routes = await Route.find();
      res.send(routes);
  } catch (error) {
      res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(route);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id); // Change to findByIdAndDelete
    if (!route) {
      return res.status(404).send('Route not found');
    }
    res.send(route);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;