const express = require("express");

const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// Get the current user's cart
router.get("/", getCart);

// Add a new product to the cart
router.post("/items", addItemToCart);

// Update product quantity or remove it by product ID
router
  .route("/items/:productId")
  .put(updateCartItem)
  .patch(updateCartItem)
  .delete(removeCartItem);
// Remove all items from the cart
router.delete("/", clearCart);

module.exports = router;