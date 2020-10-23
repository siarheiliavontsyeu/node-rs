const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
require('express-async-errors');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { incomingLogger, errorLogger } = require('./utils/logger/logger');
const { ErrorHandler } = require('./utils/errors/ErrorHandler');

const app = express();
app.disable('x-powered-by');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(incomingLogger);

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
  const error = new ErrorHandler(
    404,
    `Can not find right route for method ${req.method} and path ${req.originalUrl}`
  );
  next(error);
});

app.use(errorLogger);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
