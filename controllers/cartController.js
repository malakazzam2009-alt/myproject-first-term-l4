const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Get the current user's cart
exports.getCart = asyncHandler(async (req, res) => {
  const sessionId = req.headers.sessionid;

  // Find cart and load product details
  const cart = await Cart.findOne({ sessionId }).populate(
    "items.product",
    "name price images"
  );

  // Return empty cart if no cart exists
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

// Add a product to the cart
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;
  const { product: productId, quantity = 1 } = req.body;

  // Check if the product exists
  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Check product stock
  if (product.stock <= 0 || product.stock < quantity) {
    return next(new AppError("Not enough stock", 400));
  }

  // Find or create cart
  let cart = await Cart.findOne({ sessionId });

  if (!cart) {
    cart = await Cart.create({
      sessionId,
      items: [],
      totalPrice: 0,
    });
  }

  // Check if product already exists in cart
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

  // Recalculate total price
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

// Update product quantity in cart
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;
  const { quantity } = req.body;

  // Find user's cart
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Find the requested product in cart
  const item = cart.items.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!item) {
    return next(new AppError("Product not found in cart", 404));
  }

  // Remove item if quantity is zero or less
  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
  } else {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Check stock before updating quantity
    if (quantity > product.stock) {
      return next(new AppError("Not enough stock", 400));
    }

    item.quantity = quantity;
  }

  // Update total price
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

// Remove a product from the cart
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const sessionId = req.headers.sessionid;

  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Remove the selected item
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  // Update total price
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

// Remove all items from the cart
exports.clearCart = asyncHandler(async (req, res) => {
  const sessionId = req.headers.sessionid;

  const cart = await Cart.findOne({ sessionId });

  // Return if cart is already empty
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

  // Clear cart data
  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: cart,
  });
});