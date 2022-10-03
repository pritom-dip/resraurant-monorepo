const express = require("express");
const foodController = require("../controllers/food.controller");

const foodRoutes = express.Router();

foodRoutes
  .route("/")
  .get(foodController.getAllFoods)
  .post(foodController.createFood);

foodRoutes.route("/:id").get(foodController.getSingleFood);

module.exports = foodRoutes;
