const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRouter;
