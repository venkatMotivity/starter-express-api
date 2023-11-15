class ApiError extends Error {
  constructor(statusCode, message, data, isOperational = true, stack = '') {
    super(message);
    this.status = parseInt(statusCode);
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
