const Product = require("../models/Product");
const Category = require("../models/Category");

const asyncHandler = require("../config/asyncHandler");
const AppError = require("../config/appError");

const getProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const products = await Product.find(filter).populate("category");

  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
  });

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};