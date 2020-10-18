class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!(err instanceof ErrorHandler)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  res.status(statusCode).send(message);
  return { statusCode, message };
};

module.exports = {
  ErrorHandler,
  handleError
};
