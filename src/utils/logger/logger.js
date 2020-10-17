const { format, createLogger, transports } = require('winston');
const path = require('path');
const { combine, timestamp: timeStamp, label: laBel, printf } = format;
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const timezoned = () =>
  new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk'
  });

const options = {
  fileInfo: {
    level: 'info',
    filename: path.resolve(path.join('logs', 'app.log')),
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1
  },
  fileError: {
    level: 'error',
    filename: path.resolve(path.join('logs', 'errors.log')),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = createLogger({
  format: combine(
    laBel({ label: 'Trello Service' }),
    timeStamp({
      format: timezoned
    }),
    logFormat
  ),
  exitOnError: false,
  transports: [
    new transports.File(options.fileInfo),
    new transports.File(options.fileError),
    new transports.Console(options.console)
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
