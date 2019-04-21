import express from 'express';
import debug from 'debug';
import cors from 'cors';
import requestLogger from 'morgan';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';

import routes from './routes';
import {
  appUrl, port, logType, defaultRoute,
  readMeLink, connectionString, connectionMessage, unhandledRejection,
  uncaughtException, sigterm, exitZero
} from './utils';

const app = express();
const logger = debug(logType);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  logger(connectionMessage);
});

app.use(requestLogger('dev'));
app.use(cors());
app.use(expressValidator());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(defaultRoute, routes);

app.listen(port, () => {
  logger(`Server started on port: ${port}`);
  logger(appUrl);
});

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to Population Management Api!' });
});

app.use('*', (_, res) => res.status(404).json({
  message: `Welcome! Check the documentation ${readMeLink} for valid routes`,
}));


process.on(unhandledRejection, (reason) => { /* istanbul ignore next */
  logger(reason);
});

process.on(uncaughtException, (reason) => { /* istanbul ignore next */
  logger(reason);
  process.exit(exitZero);
});

process.on(sigterm, () => { /* istanbul ignore next */
  mongoose.connection.close();
  process.exit(exitZero);
});

export default app;

