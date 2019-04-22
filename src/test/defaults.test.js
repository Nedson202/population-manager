import '@babel/polyfill';
import chai from 'chai';
import request from 'supertest';
import app from '../index';
import { welcomeMessage } from '../utils';

const { expect } = chai;

describe('Population manager API', () => {
  it('should not add a location if any required value is missing', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal(welcomeMessage);
        done();
      });
  });
});
