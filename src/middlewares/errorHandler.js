import { stackLogger } from 'info-logger';

/**
 * Default errorHandler for caught errors
 *
 * @param {*} error error data received
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const errorHandler = (error, req, res, next) => { /* eslint-disable-line */
  /* istanbul ignore next */
  const defaultCode = 500;
  stackLogger(error);
  return res.status(error.httpStatusCode || defaultCode).json({
    error: true,
    message: error.message,
  });
};

export default errorHandler;
