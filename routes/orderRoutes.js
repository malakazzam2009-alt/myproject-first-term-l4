const express = require("express");

const {
  checkout,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .post(checkout)
  .get(getOrders);

router
  .route("/:id")
  .get(getOrder)
  .put(updateOrderStatus)
  .patch(updateOrderStatus);

module.exports = router;