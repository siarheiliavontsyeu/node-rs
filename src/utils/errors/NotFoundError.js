class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    const [, statusCode = 404] = args;
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, NotFoundError);
  }
}

module.exports = NotFoundError;
