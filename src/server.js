const { PORT } = require('./common/config');
const logger = require('./common/logging');
const app = require('./app');

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
