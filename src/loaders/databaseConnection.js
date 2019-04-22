import mongoose from 'mongoose';

import {
  connectionString, exitZero, connectionMessage,
  errorEvent, connected, disconnected, connection, error, termination
} from '../utils';
import { logger } from '..';

const dbConnection = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection
    .on(connected, () => {
      logger.info(connection(connectionMessage));
    })
    .on(errorEvent, (err) => {
      logger.error(error(`Mongoose default connection has occured ${err} error`));
    })
    .on(disconnected, () => {
      logger.warn(termination('Mongoose default connection is disconnected'));
    });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn(termination('Mongoose default connection is disconnected due to application termination'));
      process.exit(exitZero);
    });
  });
};

export default dbConnection;
