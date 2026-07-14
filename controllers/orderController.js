const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Create a new order from the user's cart
exports.createOrder = asyncHandler(async (req, res, next) => {
  // Get sessionId from header
  const sessionId = req.headers["session-id"];

  const { shippingAddress } = req.body;

  // Make sure sessionId exists
  if (!sessionId) {
    return next(new AppError("Session ID is required", 400));
  }

  // Find the user's cart with product details
  const cart = await Cart.findOne({ sessionId }).populate("items.product");

  // Make sure the cart is not empty
  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  let totalPrice = 0;
  const orderItems = [];

  // Check each product before creating the order
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    // Check if the product exists
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Check if enough stock is available
    if (product.stock < item.quantity) {
      return next(
        new AppError(
          `${product.name} does not have enough stock. Available stock: ${product.stock}`,
          400
        )
      );
    }

    // Reduce product stock
    product.stock -= item.quantity;
    await product.save();

    // Calculate total price
    totalPrice += product.price * item.quantity;

    // Add product information to order
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  // Create the order
  const order = await Order.create({
    items: orderItems,
    totalPrice,
    shippingAddress,
  });

  // Clear the cart after checkout
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: order,
  });
});


// Get all orders
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    message: "Orders retrieved successfully",
    data: orders,
  });
});


// Get a single order by ID
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order retrieved successfully",
    data: order,
  });
});


// Update only the order status
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const allowedStatus = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatus.includes(req.body.status)) {
    return next(new AppError("Invalid order status", 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    data: order,
  });
});