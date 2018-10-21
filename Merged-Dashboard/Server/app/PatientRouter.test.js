const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const patientRouter = require('./PatientRouter')

// test the headers
describe('Unit testing the / route', () => {

    it('should return OK status', function() {
      return request(patientRouter)
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

describe('Unit testing the /archived route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/archived')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

});

describe('Unit testing the /mrn/:mrn route', () => {

    it('should return OK status', function() {
      return request(app)
        .get('/mrn/:mrn')
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
