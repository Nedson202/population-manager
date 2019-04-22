import DB from '.';
import Location from '../models/Location';

class LocationRepository extends DB {
  constructor() {
    super(Location);
  }
}

export default LocationRepository;
