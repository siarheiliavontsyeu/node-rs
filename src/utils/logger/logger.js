const { format, createLogger, transports } = require('winston');
const path = require('path');
const getDataFromRequest = require('./getDataFromRequest');
const { handleError } = require('../errors/ErrorHandler');

const infoLogPath = path.resolve(path.join('logs', 'app-info.log'));
const errorLogPath = path.resolve(path.join('logs', 'app-errors.log'));

const consoleLoggerConfig = {
  format: format.combine(format.colorize(), format.cli()),
  transports: [new transports.Console()]
};

const fileLoggerConfig = {
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      level: 'info',
      filename: infoLogPath
    }),
    new transports.File({
      level: 'error',
      filename: errorLogPath
    })
  ]
};

const loggerConsole = createLogger(consoleLoggerConfig);
const loggerFile = createLogger(fileLoggerConfig);

/* eslint-disable-next-line no-unused-vars */
const incomingLogger = (req, res, next) => {
  const { logToConsole, logToFile } = getDataFromRequest(req);
  loggerConsole.log('info', logToConsole);
  loggerFile.log('info', logToFile);
  next();
};

const processErrorLogger = (message, errorType) => {
  const time = new Date().toUTCString();
  const errMSG = `${time} | ${errorType}: ${message}`;
  loggerConsole.log('error', errMSG);
  loggerFile.log('error', errMSG);
  return loggerFile;
};

/* eslint-disable-next-line no-unused-vars */
const errorLogger = (err, req, res, next) => {
  const { statusCode, message } = handleError(err, res);
  const level = statusCode >= 400 && statusCode < 500 ? 'warn' : 'error';
  const { logToFile } = getDataFromRequest(req);
  const time = new Date().toUTCString();
  const errString = `${time} | Error ${statusCode}: ${message}`;
  loggerConsole.log(level, errString);
  loggerFile.log(level, `${errString} | Request: ${logToFile}`);
};

module.exports = { incomingLogger, processErrorLogger, errorLogger };
