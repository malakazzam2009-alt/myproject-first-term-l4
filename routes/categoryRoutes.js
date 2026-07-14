const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get all categories & create a new category
router
  .route("/")
  .get(getCategories)
  .post(createCategory);

// Get, update or delete a category by ID
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;