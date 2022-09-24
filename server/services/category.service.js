const axios = require("axios");
const Category = require("../models/category.model");

const getCategories = async () => {
  return await Category.find({});
};

const createCategoryService = async (data) => {
  return await Category.create(data);
};

const getSingleCategory = async (id) => {
  return await Category.findOne({ _id: id });
};
const updateCategoryService = async (id, data) => {
  return await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

const deleteCategoryService = async (id) => {
  return await Category.deleteOne({ _id: id });
};

module.exports = {
  getCategories,
  createCategoryService,
  getSingleCategory,
  updateCategoryService,
  deleteCategoryService,
};
