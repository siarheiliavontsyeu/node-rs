const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(entity, body, message) {
    super(message || `Bad request ${entity} with: ${JSON.stringify(body)}`);
    this.status = BAD_REQUEST;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  BAD_REQUEST_ERROR: BadRequestError
};
