const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


// Create a new order from the cart
exports.createOrder = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;
  const { shippingAddress } = req.body;

  if (!sessionId) {
    return next(new AppError("Session ID is required", 400));
  }

  const cart = await Cart.findOne({ sessionId }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    if (product.stock < item.quantity) {
      return next(
        new AppError(
          `${product.name} does not have enough stock`,
          400
        )
      );
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    totalPrice += product.price * item.quantity;

    product.stock -= item.quantity;
    await product.save();
  }


  const order = await Order.create({
    items: orderItems,
    totalPrice,
    shippingAddress,
  });


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



// Get order by ID
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



// Update order status
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
    {
      status: req.body.status,
    },
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