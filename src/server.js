const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const logger = require('./common/logging');
const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection
  .on('error', () => logger.error('MongoDB connection fail:'))
  .once('open', () => {
    logger.info('Successfully connect to MongoDB');
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  });
