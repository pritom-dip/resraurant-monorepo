const express = require("express");
const categoryController = require("../controllers/category.controller");
const userController = require("../controllers/user.controller");

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(userController.protect, categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRouter;
