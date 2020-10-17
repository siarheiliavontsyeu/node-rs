const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./utils/logger/logger');
const NotFoundError = require('./utils/errors/NotFoundError');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(morgan('combined', { stream: logger.stream }));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    let body = null;

    if (req.method !== 'GET') {
      body = { ...req.body };
      delete body.password;
      body = JSON.stringify(body);
    }

    logger.info(
      `${req.method} ${req.url} query: ${JSON.stringify(req.query)} ${
        body ? `body: ${body}` : ''
      }`
    );
    next();
  });
}

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use('*', (req, res, next) => {
  const error = new NotFoundError(
    `Can not find right route for method ${req.method} and path ${req.originalUrl}`
  );
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const { name, message, statusCode } = error;
  const errorMessage = `${name}: ${message}`;

  switch (error.name) {
    case 'NotFoundError':
      logger.info(errorMessage);
      break;
    case 'ValidationError':
      logger.info(errorMessage);
      break;
    default:
      logger.error(errorMessage);
      break;
  }
  const status = statusCode || 500;
  res.status(status).json({ errorMessage });
});

module.exports = app;
