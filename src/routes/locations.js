import { Router } from 'express';
import LocationController from '../controllers/LocationController';
import { validator } from '../middlewares';
import validateLocation from '../middlewares/validateLocation';

const locationRouter = Router();

const { newLocationRequest } = validator;
const {
  addLocation, updateLocation, deleteLocation, retrieveLocations
} = LocationController;

locationRouter.get(
  '/',
  retrieveLocations
);

locationRouter.post(
  '/',
  newLocationRequest,
  addLocation
);

locationRouter.put(
  '/:locationID',
  validateLocation,
  updateLocation
);

locationRouter.delete(
  '/:locationID',
  validateLocation,
  deleteLocation
);

export default locationRouter;
