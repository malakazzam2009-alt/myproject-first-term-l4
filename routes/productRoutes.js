const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Get all products or create a new product
router
  .route("/")
  .get(getProducts)
  .post(createProduct);

// Get, update, or delete a product by its ID
router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;