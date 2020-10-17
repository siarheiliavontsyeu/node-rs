class ValidationError extends Error {
  constructor(...args) {
    super(...args);
    const [, statusCode = 400] = args;
    this.name = 'ValidationError';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, ValidationError);
  }
}

module.exports = ValidationError;
