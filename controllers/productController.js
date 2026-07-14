const Product = require("../models/Product.model");
const Category = require("../models/Category.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Get all products
exports.getProducts = asyncHandler(async (req, res) => {
  const filter = {};

  // Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};

    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }
  }

  // Show only products that are in stock
  if (req.query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  // Search by product name or description
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  // Get products with category name
  const products = await Product.find(filter).populate(
    "category",
    "name"
  );

  res.status(200).json({
    status: "success",
    message: "Products retrieved successfully",
    data: products,
  });
});

// Get a single product by ID
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name description"
  );

  // Check if product exists
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product retrieved successfully",
    data: product,
  });
});

// Create a new product
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Check if category exists
  const category = await Category.findById(req.body.category);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: product,
  });
});

// Update product by ID
exports.updateProduct = asyncHandler(async (req, res, next) => {
  // Check category if it is being updated
  if (req.body.category) {
    const category = await Category.findById(req.body.category);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // Check if product exists
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
});

// Delete product by ID
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  // Check if product exists
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});