const {
  getCategories,
  createCategoryService,
  getSingleCategory,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/category.service");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await createCategoryService(req.body);
    return res.status(201).json({ success: true, data: category });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
    });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Id is not given" });
    const category = await getSingleCategory(id);
    if (!category)
      return res
        .status(400)
        .json({ success: false, err: "No category found with this id" });
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Id is not given" });
    const result = await updateCategoryService(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: false,
        error: "Couldn't update the category with this id",
      });
    }

    return res.status(200).json({
      status: true,
      data: req?.body,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      err: err,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Id is not given" });

    const result = await deleteCategoryService(id);
    return res.status(200).json({
      success: true,
      result: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      err: err,
    });
  }
};
