const { getCategories } = require("../services/category.service");

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await getCategories();
      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        err: err,
      });
    }
  }
}

const categoryController = new CategoryController();

module.exports = categoryController;
