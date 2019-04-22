import express from 'express';
import cors from 'cors';
import requestLogger from 'morgan';
import mongoose from 'mongoose';
import { createLogger, stackLogger } from 'info-logger';
import expressValidator from 'express-validator';

import routes from './routes';
import {
  appUrl, port, defaultRoute,
  readMeLink, connectionString, connectionMessage, unhandledRejection,
  uncaughtException, sigterm, exitZero
} from './utils';

export const logger = createLogger('Error', 'log-info');

const app = express();

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  logger.info(connectionMessage);
});

app.use(requestLogger('dev'));
app.use(cors());
app.use(expressValidator());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(defaultRoute, routes);

app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
  logger.info(appUrl);
});

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to Population Management Api!' });
});

app.use('*', (_, res) => res.status(404).json({
  message: `Welcome! Check the documentation ${readMeLink} for valid routes`,
}));

process.on(unhandledRejection, (reason) => { /* istanbul ignore next */
  stackLogger(reason);
});

process.on(uncaughtException, (reason) => { /* istanbul ignore next */
  stackLogger(reason);
  process.exit(exitZero);
});

process.on(sigterm, () => { /* istanbul ignore next */
  mongoose.connection.close();
  process.exit(exitZero);
});

export default app;

