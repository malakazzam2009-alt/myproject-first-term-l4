// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Set default status code and status
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.status = "fail";
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.status = "fail";
    err.message = "Invalid ID";
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    err.statusCode = 409;
    err.status = "fail";
    err.message = "This value already exists";
  }

  // Handle custom AppError
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle unexpected server errors
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;