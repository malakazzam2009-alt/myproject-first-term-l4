const express = require("express");

const {
  checkout,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", checkout);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.put("/:id", updateOrderStatus);

module.exports = router;