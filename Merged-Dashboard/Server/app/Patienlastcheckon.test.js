const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const patientRouter = require('./PatientLastcheckon')

// test the headers
describe('Unit testing the / lastcheckon', () => {

    it('should return OK status', function() {
      return request(PatientLastcheckon)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /current patient lastcheckon', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/current')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /archived lastcheckon', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/archived')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /longestTimeSinceCheckup route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/longestTimeSinceCheckup')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});
