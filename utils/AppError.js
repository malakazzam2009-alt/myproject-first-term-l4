// Custom error class for application errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    // HTTP status code
    this.statusCode = statusCode;

    // Mark this as an operational error
    this.isOperational = true;
  }
}

module.exports = AppError;