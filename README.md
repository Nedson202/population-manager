# Population Manager
The Population Management System contains a list of locations and the total number of residents in each location broken down by gender.

# Hosted API
https://population-manager-api.herokuapp.com/api/v1/


# Requirements
* Node.js v10.x or higher
* MongoDB instance
* yarn

# Project Structure

```
  ├── controllers
  │   ├── LocationController.js
  │   └── index.js
  ├── db
  │   └── index.js
  ├── index.js
  ├── middlewares
  │   ├── errorHandler.js
  │   ├── index.js
  │   ├── validateLocation.js
  │   └── validator.js
  ├── models
  │   ├── Location.js
  │   ├── SubLocation.js
  │   └── index.js
  ├── routes
  │   ├── index.js
  │   └── locations.js
  ├── test
  │   └── locations.test.js
  └── utils
      └── index.js
```

# Installation

```bash
$ git clone https://github.com/Nedson202/population-manager.git
$ cd population-manager
$ yarn
$ yarn start:dev               # Start the development environment
$ yarn start                   # Run the production build
```

### Note
You need to create a .env file and use the .env.sample as a guide to add your development details.

You can access the API via http://localhost:4000/api/v1/

## Project Details
  Location:

    location name
    total male count
    total female count
    total number of residents
    
  The following can be performed on a location:

  * Create a new location containing data on the total number of male and female residents within it. Please note that locations can be nested within other locations
  * View a list of all available locations and their population summaries (total male residents, total female residents, sum total residents)
  * Update data for a specific locations
  * Delete a specified location

## Usage

| HTTP VERB | Description | Endpoints |
| --- | --- | --- |
| `Post` | Creates a location | /api/v1/locations |
| `GET` | Retrieves a list of all locations | /api/v1/locations |
| `PUT` | Updates data for a specific location | /api/v1/locations/:locationID |
| `DELETE` | Deletes a specified location | /api/v1/locations/:locationID |



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please endeavour to update tests as appropriate.
