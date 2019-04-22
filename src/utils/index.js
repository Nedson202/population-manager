import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const {
  PORT, NODE_ENV, DEV_DB, PROD_DB, TEST_DB
} = process.env;

const developmentDB = NODE_ENV.match('development') && DEV_DB;
const testDB = NODE_ENV.match('test') && TEST_DB;
const productionDB = NODE_ENV.match('production') && PROD_DB;

export const connectionString = developmentDB || testDB || productionDB;

export const appUrl = 'App: http://localhost:4000';
export const port = PORT || 4000;
export const exitZero = 0;
export const logType = 'dev';

export const defaultRoute = '/api/v1';
export const defaultLocationRoute = '/locations';

export const readMeLink = 'https://github.com/Nedson202/sms_management/blob/develop/README.md';

export const unhandledRejection = 'unhandledRejection';
export const uncaughtException = 'uncaughtException';
export const sigterm = 'SIGTERM';

export const defaultLimit = 15;
export const defaultPage = 1;

export const connectionMessage = 'Database connected successfully';
export const addLocationMessage = 'Location added successfully';
export const deleteLocationMessage = 'Location deleted successfully';
export const updateLocationMessage = 'Location updated successfully';
export const invalidContactID = 'Contact ID is not valid!';
export const noLocationMessage = 'This Location does not exist!';
export const noLocationsFound = 'No location added yet';
export const welcomeMessage = 'Welcome to Population Management Api!';

export const validationError = 'validationError';

export const maleCountField = 'maleCount';
export const femaleCountField = 'femaleCount';

export const updateReturnOptions = {
  new: true,
  fields: '_id name maleCount femaleCount totalResidents subLocation createdAt updatedAt'
};

// info-logger defaults
export const logFolderName = 'Error';
export const logFileName = 'log-info';

// Mongoose events
export const connected = 'connected';
export const errorEvent = 'error';
export const disconnected = 'disconnected';

// chalk log formatter
export const connection = chalk.bold.blue;
export const error = chalk.bold.red;
export const termination = chalk.bold.yellow;
