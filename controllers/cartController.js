const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../config/asyncHandler");
const AppError = require("../config/appError");


const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");

  if (!cart) {
    return res.status(200).json({
      items: [],
      totalPrice: 0,
    });
  }

  res.status(200).json(cart);
});

const addItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({
      items: [],
      totalPrice: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  cart.totalPrice = 0;

  for (const item of cart.items) {
    const p = await Product.findById(item.product);
    cart.totalPrice += p.price * item.quantity;
  }

  await cart.save();

  res.status(201).json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne();

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new AppError("Product not found in cart", 404);
  }

  item.quantity = quantity;

  cart.totalPrice = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);
    cart.totalPrice += product.price * cartItem.quantity;
  }

  await cart.save();

  res.status(200).json(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.totalPrice = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);
    cart.totalPrice += product.price * cartItem.quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed successfully",
    cart,
  });
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne();

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});

module.exports = {
  getCart,
  addItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};