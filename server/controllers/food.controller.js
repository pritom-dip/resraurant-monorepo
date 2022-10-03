const {
  getFoodsService,
  createFoodService,
  getSingleFoodService,
} = require("../services/food.service");

const getAllFoods = async (req, res) => {
  try {
    const foods = await getFoodsService();
    return res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};

const createFood = async (req, res) => {
  try {
    const food = await createFoodService(req.body);
    return res.status(201).json({
      success: true,
      data: food,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};

const getSingleFood = async (req, res) => {
  try {
    const { id } = req.params || {};
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Please provide an id" });

    const food = await getSingleFoodService(id);
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "No food found with this id" });

    return res.status(200).json({ success: true, data: food });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: error.message,
    });
  }
};

module.exports = {
  getAllFoods,
  createFood,
  getSingleFood,
};
