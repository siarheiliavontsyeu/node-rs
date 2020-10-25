const Ajv = require('ajv');
const { BAD_REQUEST_ERROR } = require('../errors/appErrors');
const ENTITY_NAME = 'validation';

const validator = schema => (req, res, next) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (valid) {
    return next();
  }

  const errors = validate.errors.map(({ message }) => message).join(', ');
  const reqBody = req.body;
  next(new BAD_REQUEST_ERROR(ENTITY_NAME, { errors, reqBody }));
};

module.exports = validator;
