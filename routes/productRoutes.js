const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Get All Products & Create Product
router
  .route("/")
  .get(getProducts)
  .post(createProduct);

// Get, Update & Delete Product
router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;