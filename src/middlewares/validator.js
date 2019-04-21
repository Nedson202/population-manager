import { validationError, } from '../utils';

/**
 * User input validator
 *
 * @class Validator
 */
class Validator {
  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @returns
   * @memberof Validator
   */
  static errorHandler(req, res, next) {
    const errors = req.validationErrors();
    const errorArray = [];

    if (errors) {
      errors.map(error => errorArray.push(error.msg));
      return res.status(400).json({
        error: true,
        errorType: validationError,
        errorData: errorArray,
      });
    }
    next();
  }

  /**
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in the call chain
   * @memberof Validator
   */
  static async newLocationRequest(req, res, next) {
    const { errorHandler } = Validator;
    req.check('maleCount', 'maleCount should be digits and not less than 0')
      .isInt().isLength({ min: 1 });
    req.check('femaleCount', 'femaleCount should be digits and not less than 0')
      .isInt().isLength({ min: 1 });

    errorHandler(req, res, next);
  }
}

export default Validator;
