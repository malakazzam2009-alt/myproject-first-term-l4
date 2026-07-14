const Category = require("../models/Category.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Get all categories
exports.getCategories = asyncHandler(async (req, res, next) => {
  // Get all categories from database
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Categories retrieved successfully",
    data: categories,
  });
});

// Get category by ID
exports.getCategory = asyncHandler(async (req, res, next) => {
  // Find category by ID
  const category = await Category.findById(req.params.id);

  // Check if category exists
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category retrieved successfully",
    data: category,
  });
});

// Create a new category
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Create category
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

// Update category by ID
exports.updateCategory = asyncHandler(async (req, res, next) => {
  // Update category and return updated document
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // Check if category exists
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
});

// Delete category by ID
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  // Delete category
  const category = await Category.findByIdAndDelete(req.params.id);

  // Check if category exists
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: null,
  });
});