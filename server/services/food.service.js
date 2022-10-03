const Food = require("../models/food.model");

exports.getFoodsService = async () => {
  return await Food.find();
};

exports.createFoodService = async (data) => {
  return await Food.create(data);
};

exports.getSingleFoodService = async (_id) => {
  return await Food.findById({ _id }).populate([
    "createdBy.id",
    "categories.id",
    "reviews.id",
  ]);
};
