const express = require("express");

const {
  getCart,
  addItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);

router.post("/", addItem);

router.put("/", updateCartItem);
router.patch("/", updateCartItem);

router.delete("/:productId", removeCartItem);

router.delete("/", clearCart);

module.exports = router;