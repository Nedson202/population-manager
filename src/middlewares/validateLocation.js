import LocationRepository from '../repositories/LocationRepository';
import { noLocationMessage } from '../utils';

const locationDB = new LocationRepository();

/**
 * Check if a location has been registered
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateLocation = async (req, res, next) => {
  const { locationID } = req.params;
  const location = await locationDB.findById(locationID);
  if (!location) {
    return res.status(404).json({
      error: true,
      message: noLocationMessage
    });
  }
  req.location = location;
  next();
};

export default validateLocation;
