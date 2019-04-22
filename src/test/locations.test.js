import '@babel/polyfill';
import chai from 'chai';
import request from 'supertest';
import app from '../index';
import { defaultRoute, addLocationMessage, noLocationsFound, updateLocationMessage, deleteLocationMessage } from '../utils';
import LocationRepository from '../repositories/LocationRepository';

const locationDB = new LocationRepository();

const { expect } = chai;

let savedLocation;

describe('Population manager API', () => {
  before(async () => {
    await locationDB.deleteMany({});
  });

  it('should not add a location if any required value is missing', (done) => {
    request(app)
      .post(`${defaultRoute}/locations`)
      .send({
        name: 'Lao',
        femaleCount: 200
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should add a location', (done) => {
    request(app)
      .post(`${defaultRoute}/locations`)
      .send({
        name: 'Lao',
        maleCount: 100,
        femaleCount: 200
      })
      .end((err, res) => {
        if (err) done(err);
        const { location, message } = res.body;
        expect(res.statusCode).to.equal(201);
        expect(message).to.equal(addLocationMessage);
        expect(location.name).to.equal('Lao');
        savedLocation = location;
        done();
      });
  });

  it('should not add a location if it exists', (done) => {
    request(app)
      .post(`${defaultRoute}/locations`)
      .send({
        name: 'Lao',
        maleCount: 100,
        femaleCount: 200
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(500);
        expect(res.body.error).to.equal(true);
        done();
      });
  });

  it('should return a list of locations and their population', (done) => {
    request(app)
      .get(`${defaultRoute}/locations`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        // expect(res.body.error).to.equal(true);
        done();
      });
  });

  it('should update a location and its population', (done) => {
    request(app)
      // eslint-disable-next-line no-underscore-dangle
      .put(`${defaultRoute}/locations/${savedLocation._id}`)
      .send({
        maleCount: 500,
        femaleCount: 200
      })
      .end((err, res) => {
        if (err) done(err);
        const { updatedLocation, message, error } = res.body;
        expect(res.statusCode).to.equal(200);
        expect(error).to.equal(false);
        expect(updatedLocation.maleCount).to.equal(500);
        expect(message).to.equal(updateLocationMessage);
        done();
      });
  });

  it('should delete a location and its population', (done) => {
    request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`${defaultRoute}/locations/${savedLocation._id}`)
      .end((err, res) => {
        if (err) done(err);
        const { message, error } = res.body;
        expect(res.statusCode).to.equal(200);
        expect(error).to.equal(false);
        expect(message).to.equal(deleteLocationMessage);
        done();
      });
  });

  it('should return feedback if no location is found', (done) => {
    request(app)
      .get(`${defaultRoute}/locations`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal(noLocationsFound);
        done();
      });
  });
});
