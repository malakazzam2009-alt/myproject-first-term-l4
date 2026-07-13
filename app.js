require("dotenv").config();

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");

const AppError = require("./utils/AppError");
const errorHandler = require("./middlewares/errorHandler");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(mongoSanitize());
// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "E-Commerce API is running...",
  });
});

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;