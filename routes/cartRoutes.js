const express = require("express");

const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// Get Cart
router.get("/", getCart);

// Add Item
router.post("/items", addItemToCart);

// Update Item Quantity
router
  .route("/items/:productId")
  .put(updateCartItem)
  .patch(updateCartItem)
  .delete(removeCartItem);

// Clear Cart
router.delete("/", clearCart);

module.exports = router;