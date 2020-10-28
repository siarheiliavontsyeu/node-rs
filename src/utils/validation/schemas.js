const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  taskId: Joi.object({
    id: Joi.objectId().required(),
    boardId: Joi.objectId().required()
  }),
  id: Joi.object({
    id: Joi.objectId().required()
  }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
      )
    }),
  board: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),
      columns: Joi.array().required()
    })
};

module.exports = schemas;
