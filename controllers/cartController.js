const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Get Cart
exports.getCart = asyncHandler(async (req, res) => {
  const sessionId = req.headers.sessionid;

  const cart = await Cart.findOne({ sessionId }).populate(
    "items.product",
    "name price images"
  );

  if (!cart) {
    return res.status(200).json({
      status: "success",
      message: "Cart is empty",
      data: {
        items: [],
        totalPrice: 0,
      },
    });
  }

  res.status(200).json({
    status: "success",
    message: "Cart retrieved successfully",
    data: cart,
  });
});

// Add Item To Cart
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;
  const { product: productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (product.stock <= 0 || product.stock < quantity) {
    return next(new AppError("Not enough stock", 400));
  }

  let cart = await Cart.findOne({ sessionId });

  if (!cart) {
    cart = await Cart.create({
      sessionId,
      items: [],
      totalPrice: 0,
    });
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (item) {
    if (item.quantity + quantity > product.stock) {
      return next(new AppError("Not enough stock", 400));
    }

    item.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
    });
  }

  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(201).json({
    status: "success",
    message: "Item added to cart",
    data: cart,
  });
});

// Update Item Quantity
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const item = cart.items.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!item) {
    return next(new AppError("Product not found in cart", 404));
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
  } else {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    if (quantity > product.stock) {
      return next(new AppError("Not enough stock", 400));
    }

    item.quantity = quantity;
  }

  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart updated successfully",
    data: cart,
  });
});

// Remove Item
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;

  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Item removed successfully",
    data: cart,
  });
});

// Clear Cart
exports.clearCart = asyncHandler(async (req, res) => {
  const sessionId = req.headers.sessionid;

  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return res.status(200).json({
      status: "success",
      message: "Cart is already empty",
      data: {
        items: [],
        totalPrice: 0,
      },
    });
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: cart,
  });
});