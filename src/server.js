const { PORT } = require('./common/config');
const { processErrorLogger } = require('./utils/logger/logger');

process
  .on('unhandledRejection', error => {
    processErrorLogger(error.stack, 'Unhandled Rejection');
    const { exit } = process;
    exit(1);
  })
  .on('uncaughtException', error => {
    const logger = processErrorLogger(error.stack, 'Uncaught Exception');
    const { exit } = process;
    logger.on('finish', () => exit(1));
  });

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
