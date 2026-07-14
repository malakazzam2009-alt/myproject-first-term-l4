const express = require("express");

// Import order controller functions
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Get all orders or create a new order
router
  .route("/")
  .get(getOrders)
  .post(createOrder);

// Get a single order by its ID
router.get("/:id", getOrder);

// Update only the order status
router
  .route("/:id/status")
  .put(updateOrderStatus)
  .patch(updateOrderStatus);

module.exports = router;