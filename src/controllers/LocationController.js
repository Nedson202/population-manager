import { Location } from '../models';
import DB from '../db';
import {
  deleteLocationMessage, addLocationMessage,
  updateLocationMessage,
  updateReturnOptions,
  defaultLimit,
  defaultPage,
  noLocationsFound
} from '../utils';

/**
 * Controller to manage contact related data like contact creation, login
 *
 * @class LocationController
 */
class LocationController {
  /**
   * Create a location and its population
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof LocationController
   */
  static async addLocation(req, res, next) {
    try {
      const { name, maleCount, femaleCount } = req.body;
      const data = {
        name,
        maleCount: Number(maleCount),
        femaleCount: Number(femaleCount),
      };
      const location = await DB.create(Location, data);
      return res.status(201).json({
        error: false,
        message: addLocationMessage,
        location
      });
    } catch (error) { /* istanbul ignore next */
      next(error);
    }
  }

  /**
   * Retieve a list of locations and their summaries
   *
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} next call next action in like errorHandler
   * @returns
   * @memberof LocationController
   */
  static async retrieveLocations(req, res, next) {
    try {
      const { limit = defaultLimit, page = defaultPage } = req.query;
      const retrieveOptions = { limit: Number(limit), page: Number(page) };
      const locations = await DB.paginateAll(Location, null, retrieveOptions);

      if (!locations.docs.length) {
        return res.status(404).json({
          error: false,
          message: noLocationsFound,
          locations
        });
      }
      return res.status(200).json({
        error: false,
        message: addLocationMessage,
        locations
      });
    } catch (error) { /* istanbul ignore next */
      next(error);
    }
  }

  /**
   * Update a locations information
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} res call next action in like errorHandler
   * @returns
   * @memberof LocationController
   */
  static async updateLocation(req, res, next) {
    try {
      const {
        location: {
          id: locationID, name: currentName,
          maleCount: currentMaleCount, femaleCount: currentFemaleCount,
        }
      } = req;
      const { name, maleCount, femaleCount } = req.body;
      const query = { _id: locationID };
      const newMaleCount = Number(maleCount) || currentMaleCount;
      const newFemaleCount = Number(femaleCount) || currentFemaleCount;
      const totalResidents = newMaleCount + newFemaleCount;
      const updateObject = {
        name: name || currentName,
        maleCount: newMaleCount,
        femaleCount: newFemaleCount,
        totalResidents
      };

      const updatedLocation = await
      DB.updateOne(Location, query, updateObject, updateReturnOptions);

      return res.status(200).json({
        error: false,
        message: updateLocationMessage,
        updatedLocation
      });
    } catch (error) { /* istanbul ignore next */
      next(error);
    }
  }

  /**
   * Remove a location from the database
   *
   * @static
   * @param {*} req request object from client
   * @param {*} res response object sent to client
   * @param {*} res call next action in like errorHandler
   * @returns
   * @memberof LocationController
   */
  static async deleteLocation(req, res, next) {
    try {
      const { location } = req;
      await DB.deleteMany(Location, location);
      return res.status(200).json({
        error: false,
        message: deleteLocationMessage
      });
    } catch (error) { /* istanbul ignore next */
      next(error);
    }
  }
}

export default LocationController;
