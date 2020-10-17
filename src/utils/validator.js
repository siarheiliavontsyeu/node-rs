const Ajv = require('ajv');
const ValidationError = require('./errors/ValidationError');

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
    new ValidationError(
      `${req.method}: ${req.originalUrl} [ ${errors} ]\n${body}`,
      400
    )
  );
};

module.exports = validator;
