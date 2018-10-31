const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const patientRouter = require('./LoginRouter')

// test the headers
describe('Unit testing the / route', () => {

    it('should return OK status', function() {
      return request(LoginRouter)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /current route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/current')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /login route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/user')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /register route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/register')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});
