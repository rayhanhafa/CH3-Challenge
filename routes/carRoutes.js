const express = require('express');

const router = express.Router();

const carController = require('../controllers/carController')

//routes
router.route("/")
    .get(carController.defaultRouter);
router.route("/cars")
    .get(carController.getCars)
    .post(carController.createCar)
router
    .route("/cars/:id")
    .get(carController.getCarById)
    .put(carController.updateCar)
    .delete(carController.deleteCar)

module.exports = router;