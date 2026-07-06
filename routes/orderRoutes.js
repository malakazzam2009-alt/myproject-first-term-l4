const express = require("express");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Create Order & Get All Orders
router
  .route("/")
  .get(getOrders)
  .post(createOrder);

// Get Order By ID
router.get("/:id", getOrder);

// Update Order Status
router
  .route("/:id/status")
  .put(updateOrderStatus)
  .patch(updateOrderStatus);

module.exports = router;