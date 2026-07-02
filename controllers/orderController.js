const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const asyncHandler = require("../config/asyncHandler");
const AppError = require("../config/appError");

const checkout = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new AppError(`${item.product.name} is out of stock`, 400);
    }
  }

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    product.stock -= item.quantity;

    await product.save();
  }

  const order = await Order.create({
    items: cart.items,
    totalPrice: cart.totalPrice,
  });

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("items.product");

  res.status(200).json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.status = status;

  await order.save();

  res.status(200).json(order);
});

module.exports = {
  checkout,
  getOrders,
  getOrder,
  updateOrderStatus,
};