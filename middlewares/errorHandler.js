const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Validation Error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.status = "fail";
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.status = "fail";
    err.message = "Invalid ID";
  }

  // Duplicate Key
  if (err.code === 11000) {
    err.statusCode = 409;
    err.status = "fail";
    err.message = "This value already exists";
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;