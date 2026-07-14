// Wrap async controller functions and forward any errors to Express error handler
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Pass the error to the global error handler
      next(error);
    }
  };
};

module.exports = asyncHandler;