const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Get All Categories & Create Category
router
  .route("/")
  .get(getCategories)
  .post(createCategory);

// Get, Update & Delete Category
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;