const Ajv = require('ajv');
const { ErrorHandler } = require('./errors/ErrorHandler');

const validator = schema => (req, res, next) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (valid) {
    return next();
  }

  const errors = validate.errors.map(({ message }) => message).join(', ');
  const body = JSON.stringify(req.body);

  next(
    new ErrorHandler(
      400,
      `${req.method}: ${req.originalUrl} | [ ${errors} ] | ${body}`
    )
  );
};

module.exports = validator;
