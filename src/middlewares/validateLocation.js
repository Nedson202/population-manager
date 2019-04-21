import { Location } from '../models';
import DB from '../db';
import { noLocationMessage } from '../utils';

const validateLocation = async (req, res, next) => {
  const { locationID } = req.params;
  const location = await DB.findById(Location, locationID);
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
