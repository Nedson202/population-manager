import express from 'express';
import cors from 'cors';
import requestLogger from 'morgan';
import { createLogger, stackLogger } from 'info-logger';
import expressValidator from 'express-validator';

import routes from './routes';
import {
  appUrl, port, defaultRoute,
  readMeLink, unhandledRejection, welcomeMessage,
  uncaughtException, exitZero, logFolderName, logFileName, logType,
  connection
} from './utils';
import dbConnection from './loaders/databaseConnection';

export const logger = createLogger(logFolderName, logFileName);

const app = express();

dbConnection();

app.use(requestLogger(logType));
app.use(cors());
app.use(expressValidator());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(defaultRoute, routes);

app.listen(port, () => {
  logger.info(connection(`Server started on port: ${port}`));
  logger.info(connection(appUrl));
});

app.get('/', (_, res) => {
  res.json({ message: welcomeMessage });
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

export default app;

